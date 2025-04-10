import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";


type ChunkType = {
  title: string
  explanation: string
}

export function ChunksSection({ chunks }: { chunks: ChunkType[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Key Concepts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chunks.map((chunk, index) => (
          
            <Card className="h-full border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
              <CardHeader className="bg-slate-50 dark:bg-slate-800 rounded-t-lg pb-2">
                <CardTitle className="text-lg text-slate-800 dark:text-slate-100">{chunk.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-slate-600 dark:text-slate-300">{chunk.explanation}</p>
              </CardContent>
            </Card>
         
        ))}
      </div>
    </div>
  )
}