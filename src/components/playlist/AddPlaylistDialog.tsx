import { useState } from "react";

import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";

interface AddPlaylistDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (playlist: {
    title: string;
    url: string;
    description: string;
  }) => void;
  onInvalidUrl: () => void;
}

export const AddPlaylistDialog = ({
  isOpen,
  onClose,
  onAdd,
  onInvalidUrl,
}: AddPlaylistDialogProps) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  // URL 유효성 검사
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    // URL 유효성 검사
    if (!isValidUrl(url.trim())) {
      onInvalidUrl();
      return;
    }

    onAdd({
      title: title.trim(),
      url: url.trim(),
      description: description.trim(),
    });

    // 폼 초기화
    setTitle("");
    setUrl("");
    setDescription("");
    onClose();
  };

  const handleClose = () => {
    setTitle("");
    setUrl("");
    setDescription("");
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>나만의 플레이리스트 추가</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">제목 *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="플레이리스트 제목을 입력하세요"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">YouTube URL *</Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.youtube.com/..."
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">설명 (선택사항)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="플레이리스트에 대한 간단한 설명을 입력하세요"
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                취소
              </Button>
              <Button type="submit" disabled={!title.trim() || !url.trim()}>
                추가
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
