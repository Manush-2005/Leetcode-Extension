import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/Button';
import axios from 'axios';
import { ChevronDown, ChevronUp, Lightbulb, Code, Brain } from 'lucide-react';

const ProblemAnalysis = ({ que, description, diffculty }: { que: string; description: string; diffculty: string }) => {
  const [analysisdata, setAnalysisData] = useState<any>(null);
  const [expandedChunk, setExpandedChunk] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.post(
        `http://127.0.0.1:8000/analyze-problem?title=${que}&description=${description.replace(/\s+/g, '')}`
      );
      const data = res.data;
      setAnalysisData(data);
    }
    fetchData();
  }, [que, description]);

  const toggleChunk = (index: number) => {
    setExpandedChunk(expandedChunk === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-gray-100">
      {analysisdata ? (
        <>
          {/* Problem Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">{analysisdata.problem + " " + "Problem Analysis"}</h1>
              <div className="flex gap-2 mb-4">
                {/* <Badge variant="destructive">{diffculty}</Badge> */}
                <div className="relative inline-flex items-center justify-center text-caption px-2 py-1 gap-1 rounded-full bg-fill-secondary cursor-pointer transition-colors hover:bg-fill-primary hover:text-text-primary text-sd-secondary-foreground hover:opacity-80">

            <span>{diffculty}</span>
            </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="chunks" className="mb-8">
          <TabsList className="mb-4 bg-gray-800 border border-gray-700 rounded-md">
    <TabsTrigger
      value="chunks"
      className="text-gray-100 hover:bg-blue-600 focus:bg-blue-600 focus:text-white"
    >
      Chunks
    </TabsTrigger>
    <div className="w-px bg-white mx-2"></div>
    <TabsTrigger
      value="code_snippets"
      className="text-gray-100 hover:bg-green-600 focus:bg-green-600 focus:text-white"
    >
      Code Snippets
    </TabsTrigger>
    <div className="w-px bg-white mx-2"></div> 
    <TabsTrigger
      value="strategy"
      className="text-gray-100 hover:bg-purple-600 focus:bg-purple-600 focus:text-white"
    >
      Strategy
    </TabsTrigger>
  </TabsList>
             

            {/* Chunks Section */}
            <TabsContent value="chunks" className="space-y-6">
              <div className="mb-4">
                <Lightbulb className="h-5 w-5 mr-2 text-yellow-500 inline-block" />
                <h2 className="text-lg font-semibold inline-block">Chunks</h2>
                <p className="text-sm text-gray-500 mt-2">
                  Chunks are small, manageable concepts that help you solve the problem step by step.
                </p>
              </div>
              {analysisdata.chunks.map((chunk: any, index: number) => (
                <Card key={index} className="mb-4 border-l-4 border-l-blue-500">
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer"
                    onClick={() => toggleChunk(index)}
                  >
                    <h3 className="font-medium">{chunk.title}</h3>
                    {expandedChunk === index ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </div>
                  {expandedChunk === index && (
                    <CardContent className="pt-4">
                      <p>{chunk.explanation}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </TabsContent>

            {/* Code Snippets Section */}
            <TabsContent value="code_snippets" className="space-y-6">
              <div className="mb-4">
                <Code className="h-5 w-5 mr-2 text-green-500 inline-block" />
                <h2 className="text-lg font-semibold inline-block">Code Snippets</h2>
                <p className="text-sm text-gray-500 mt-2">
                  Code snippets demonstrate key concepts and can be directly applied to solve the problem.
                </p>
              </div>
              {analysisdata.code_snippets.map((snippet: any, index: number) => (
                <Card key={index} className="mb-4 shadow-lg border border-gray-700">
                  <CardHeader>
                    <Badge variant="outline">{snippet.chunk_title}</Badge>
                    <CardDescription className="text-sm text-gray-400 mt-2">{snippet.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-gray-900 text-white p-4 rounded-md text-sm overflow-auto">
                      <code>{snippet.code}</code>
                    </pre>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Strategy Section */}
            <TabsContent value="strategy" className="space-y-6">
              <div className="mb-4">
                <Brain className="h-5 w-5 mr-2 text-purple-500 inline-block" />
                <h2 className="text-lg font-semibold inline-block">Strategy</h2>
                <p className="text-sm text-gray-500 mt-2">
                  The strategy combines chunks and code snippets to solve the problem effectively.
                </p>
              </div>
              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="pt-6">
                  <p className="whitespace-pre-line">{analysisdata.strategy}</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <h1 className="text-center text-lg font-medium">Loading...</h1>
      )}
    </div>
  );
};

export default ProblemAnalysis;