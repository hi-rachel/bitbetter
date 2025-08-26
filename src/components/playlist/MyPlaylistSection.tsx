import { useState } from "react";

import { motion } from "framer-motion";
import { Check, Edit2, Plus, Share2, X } from "lucide-react";

import { PlaylistList } from "@/components/playlist/PlaylistList";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Input } from "@/components/ui/Input";
import { Toast } from "@/components/ui/Toast";
import { usePlaylists } from "@/hooks/usePlaylists";

import { AddPlaylistDialog } from "./AddPlaylistDialog";

export const MyPlaylistSection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastConfig, setToastConfig] = useState({
    title: "",
    message: "",
    type: "success" as "success" | "error",
  });
  const [editingTitle, setEditingTitle] = useState("");
  const {
    customPlaylists,
    myPlaylistTitle,
    isEditingTitle,
    addCustomPlaylist,
    deleteCustomPlaylist,
    updateMyPlaylistTitle,
    setIsEditingTitle,
    generateShareText,
  } = usePlaylists();

  const handleAddPlaylist = (playlist: {
    title: string;
    url: string;
    description: string;
  }) => {
    addCustomPlaylist(playlist);
  };

  const handleShare = async () => {
    const shareText = generateShareText();
    try {
      await navigator.clipboard.writeText(shareText);
      setToastConfig({
        title: "복사 완료",
        message: "플레이리스트 목록이 클립보드에 복사되었습니다!",
        type: "success",
      });
      setIsToastOpen(true);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      setToastConfig({
        title: "복사 실패",
        message: `클립보드 복사에 실패했습니다. 아래 텍스트를 수동으로 복사해주세요:\n\n${shareText}`,
        type: "error",
      });
      setIsToastOpen(true);
    }
  };

  const handleDeletePlaylist = (id: string) => {
    setDeleteTargetId(id);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteTargetId) {
      deleteCustomPlaylist(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  const handleEditTitle = () => {
    setEditingTitle(myPlaylistTitle);
    setIsEditingTitle(true);
  };

  const handleSaveTitle = () => {
    if (editingTitle.trim()) {
      updateMyPlaylistTitle(editingTitle);
      setIsEditingTitle(false);
      window.location.reload();
    }
  };

  const handleCancelEdit = () => {
    setEditingTitle(myPlaylistTitle);
    setIsEditingTitle(false);
  };

  return (
    <div className="w-full mb-12 relative z-10">
      {/* My Playlist 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          {isEditingTitle ? (
            <div className="flex items-center gap-2">
              <Input
                value={editingTitle}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 20) {
                    setEditingTitle(value);
                  }
                }}
                className="text-3xl font-bold text-center w-auto min-w-[200px]"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSaveTitle();
                  } else if (e.key === "Escape") {
                    handleCancelEdit();
                  }
                }}
                maxLength={20}
                autoFocus
              />
              <Button
                onClick={handleSaveTitle}
                size="sm"
                className="rounded-full w-8 h-8 p-0 relative z-10"
                disabled={
                  !myPlaylistTitle.trim() || myPlaylistTitle.length > 20
                }
              >
                <Check className="w-4 h-4" />
              </Button>
              <Button
                onClick={handleCancelEdit}
                variant="outline"
                size="sm"
                className="rounded-full w-8 h-8 p-0 relative z-10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h2 className="text-3xl font-bold text-gray-900">
                {myPlaylistTitle}
              </h2>
              <Button
                onClick={handleEditTitle}
                variant="ghost"
                size="sm"
                className="rounded-full w-8 h-8 p-0 relative z-10"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            </div>
          )}
          <Button
            onClick={() => setIsDialogOpen(true)}
            size="sm"
            className="rounded-full w-10 h-10 p-0 relative z-10"
          >
            <Plus className="w-5 h-5" />
          </Button>
          <Button
            onClick={handleShare}
            variant="outline"
            size="sm"
            className="rounded-full w-10 h-10 p-0 relative z-10"
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
        <p className="text-gray-600">나만의 플레이리스트를 만들어보세요</p>
      </motion.div>

      {/* 플레이리스트 카드들 */}
      <PlaylistList
        playlists={customPlaylists}
        showDeleteButton={true}
        onDelete={handleDeletePlaylist}
      />

      {/* 플레이리스트 추가 다이얼로그 */}
      <AddPlaylistDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAdd={handleAddPlaylist}
      />

      {/* 삭제 확인 다이얼로그 */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
          setDeleteTargetId(null);
        }}
        onConfirm={handleConfirmDelete}
        title="플레이리스트 삭제"
        message="정말로 이 플레이리스트를 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
      />

      {/* 토스트 알림 */}
      <Toast
        isOpen={isToastOpen}
        onClose={() => setIsToastOpen(false)}
        title={toastConfig.title}
        message={toastConfig.message}
        type={toastConfig.type}
        duration={4000}
      />
    </div>
  );
};
