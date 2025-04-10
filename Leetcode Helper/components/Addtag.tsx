import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/Dialog';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Checkbox } from './ui/Checkbox';

const Addtag = ({ problemId }: { problemId: string }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tag, setTag] = useState<string>('');
  const id = problemId;

  const [tags, setTags] = useState<string[]>(() => {
    const savedTags = localStorage.getItem(id);
    return savedTags ? JSON.parse(savedTags) : [];
  });

  const [Globaltags, setGlobaltags] = useState<string[]>(() => {
    const savedGlobaltags = localStorage.getItem('GlobalTags');
    return savedGlobaltags ? JSON.parse(savedGlobaltags) : [];
  });

  const handleAddTag = async (tag: string) => {
    if (tag) {
      tags.push(tag);
      setTags([...tags]);

      Globaltags.push(tag);
      setGlobaltags([...Globaltags]);

      localStorage.setItem('GlobalTags', JSON.stringify(Globaltags));
      localStorage.setItem(id, JSON.stringify(tags));

      window.dispatchEvent(new CustomEvent('Tagsupdated'));
      setTag(''); // Clear the input field after adding the tag
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-blue-500 text-white hover:bg-blue-600">
          + Add Tag
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black text-white rounded-lg shadow-lg border border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-white">Add Your Tag</DialogTitle>
          <DialogDescription className="text-sm text-gray-400">
            Add a tag for the algorithm used in this problem.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right text-sm font-medium text-gray-300">Tag Name:</span>
            <Input
  type="text"
  value={tag}
  onChange={(e) => setTag(e.target.value)}
  className="col-span-3 bg-gray-800 text-white border border-gray-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400"
  placeholder="Enter a tag..."
/>
          </div>
        </div>

        

        <DialogFooter>
          <Button
            onClick={() => handleAddTag(tag)}
            variant="outline"
            className="text-black hover:bg-blue-600 bg-white"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Addtag;