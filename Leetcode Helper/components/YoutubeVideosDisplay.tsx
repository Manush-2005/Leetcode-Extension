

import React from 'react';
import { Card, CardContent } from '../components/ui/Card';


import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Skeleton } from '../components/ui/skeleton';
import axios from 'axios';

const VideoRecommendations = ({ que }: { que: string }) => {

    const [videodata, setvideodata] = useState<any>(null);

  useEffect(() => {
    async function fetchdata() {
      const res = await axios.get(`http://127.0.0.1:8000/recommend?topic=${que}`);
      const data1 = res.data;
      setvideodata(data1);
    }
    fetchdata();
  }, [que]);
  return (
    <div className="p-4 rounded shadow-md">
      {videodata ? (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">{videodata.topic} Related videos on youtube</h2>
            {videodata.difficulty && (
              <Badge className={`${
                videodata.difficulty === "Hard" ? "bg-red-500" : 
                videodata.difficulty === "Medium" ? "bg-amber-500" : 
                "bg-green-500"}`}>
                {videodata.difficulty}
              </Badge>
            )}
          </div>
          
          <Tabs defaultValue="videos" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="videos">Videos</TabsTrigger>
              
            </TabsList>
            <TabsContent value="videos" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {videodata.videos.map((video, index) => (
                  <Card key={index} className="border shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="relative aspect-video">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${video.url.split('v=')[1]}`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-t"
                      ></iframe>
                    </div>
                    <CardContent className="p-3">
                      <p className="font-medium line-clamp-2 text-sm" title={video.title}>
                        {video.title}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          YouTube
                        </Badge>
                        {video.tags && video.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-6 w-16" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="space-y-2">
                <Skeleton className="h-40 w-full rounded" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoRecommendations;