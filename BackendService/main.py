from typing import List, Dict, TypedDict, Annotated, Literal
from langgraph.graph import StateGraph, END, add_messages
from langchain_google_genai import ChatGoogleGenerativeAI
from tavily import TavilyClient
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from langchain.prompts import ChatPromptTemplate
from pydantic import BaseModel
from langchain.output_parsers import PydanticOutputParser


class Chunk(BaseModel):
    title: str
    explanation: str

class CodeSnippet(BaseModel):
    chunk_title: str
    description: str
    code: str

class AnalysisResponse(BaseModel):
    problem: str
    description: str
    chunks: List[Chunk]
    code_snippets: List[CodeSnippet]
    strategy: str

class VideoState(TypedDict):
    topic: str
    search_query: str
    video_links: list[dict]
    messages: Annotated[list, add_messages]





problem_db = {}

origins = ["*"]

prompt_template = ChatPromptTemplate.from_template(
    """
    Given the LeetCode problem:
    Title: '{title}'
    Description: '{description}'
    
    Identify 2-5 small, practical sub-concepts (chunks) a user must know to solve this problem. 
    Each chunk should be a specific coding skill (e.g., 'Adding an element to a HashMap', 'Iterating over an array'), 
    with a title and a short explanation (1-2 sentences). 
    For each chunk, provide a code snippet that demonstrates the concept. 
    Each code snippet should include:
    - The chunk title it corresponds to
    - A short description of what the code does
    - The actual code (in Java only)
    Limit to a maximum of 5 chunks.
    Provide a high-level strategy to solve the problem without giving full code. 
    The strategy must explicitly reference the chunks and code snippets by their titles (e.g., 'Use the skill from Chunk 1 and the code snippet for Chunk 1 to...'), 
    showing how they combine to solve the problem.
    
    Return the result as a JSON object with 'problem', 'description', 'chunks', 'code_snippets', and 'strategy' fields.
    Ensure the output matches this Pydantic schema:
    {schema}
    """
)

output_parser = PydanticOutputParser(pydantic_object=AnalysisResponse)


llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash",
    google_api_key="API_KEY"
)
tailvy = TavilyClient(api_key="API_KEY")


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
async def analyze_node(state: VideoState) -> VideoState:
    prompt = (
        f"Given the question title '{state['topic']}' from leetcode, generate a concise search query "
        "to find solution YouTube video to this question. Include 'youtube' in the query."
    )
    res = await llm.ainvoke(prompt)
    return {
        **state,
        "search_query": res.content,
        "messages": state["messages"] + [res]
    }

async def search_node(state: VideoState) -> VideoState:
    query = state["search_query"]
    search_results = tailvy.search(
        query=query,
        search_depth="basic",
        max_results=5,
        include_domains=["youtube.com"]
    )
    video_links = [
        {"url": result["url"], "title": result["title"]}
        for result in search_results["results"]
    ]
    return {
        **state,
        "video_links": video_links
    }

workflow = StateGraph(VideoState)
workflow.add_node("analyze", analyze_node)
workflow.add_node("search", search_node)
workflow.add_edge("analyze", "search")
workflow.add_edge("search", END)
workflow.set_entry_point("analyze")
graph = workflow.compile()

async def get_video_links(topic: str) -> list[dict]:
    initial_state = {"topic": topic, "search_query": "", "video_links": [], "messages": []}
    result = await graph.ainvoke(initial_state)
    return result["video_links"]



@app.post("/analyze-problem", response_model=AnalysisResponse)
async def analyze_problem(title: str, description: str):
    if title in problem_db:
        return problem_db[title]
    
    prompt = prompt_template.format(
        title=title,
        description=description,
        schema=output_parser.get_format_instructions()
    )

    try:
        res = llm.invoke(prompt)
        analysis = output_parser.parse(res.content)
        analysis.problem = title
        analysis.description = description
        problem_db[title] = analysis
        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"LLM error: {str(e)}")


@app.get("/recommend")
async def recommend_videos(topic: str):
    if not topic:
        raise HTTPException(status_code=400, detail="Topic is required")
    try:
        video_links = await get_video_links(topic)
        if not video_links:
            return {"message": f"No videos found for topic '{topic}'", "videos": []}
        return {"topic": topic, "videos": video_links}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")