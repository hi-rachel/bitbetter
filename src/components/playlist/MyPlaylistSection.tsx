import { useState } from "react";

import { motion } from "framer-motion";
import { Check, Edit2, Plus, Share2, Trash2, X } from "lucide-react";

import { PlaylistCard } from "@/components/playlist/PlaylistCard";
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
      alert("플레이리스트 목록이 클립보드에 복사되었습니다!");
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      // 폴백: 사용자에게 수동 복사 안내
      alert(
        `클립보드 복사에 실패했습니다. 아래 텍스트를 수동으로 복사해주세요:\n\n${shareText}`
      );
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
    setIsEditingTitle(true);
  };

  const handleSaveTitle = () => {
    setIsEditingTitle(false);
  };

  const handleCancelEdit = () => {
    setIsEditingTitle(false);
  };

  return (
    <div className="mb-12">
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
                value={myPlaylistTitle}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 20) {
                    updateMyPlaylistTitle(value);
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
                className="rounded-full w-8 h-8 p-0"
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
                className="rounded-full w-8 h-8 p-0"
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
                className="rounded-full w-8 h-8 p-0"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            </div>
          )}
          <Button
            onClick={() => setIsDialogOpen(true)}
            size="sm"
            className="rounded-full w-10 h-10 p-0"
          >
            <Plus className="w-5 h-5" />
          </Button>
          <Button
            onClick={handleShare}
            variant="outline"
            size="sm"
            className="rounded-full w-10 h-10 p-0"
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
        <p className="text-gray-600">나만의 플레이리스트를 만들어보세요</p>
      </motion.div>

      {/* 플레이리스트 카드들 */}
      {customPlaylists.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-gray-400 mb-4">
            <Plus className="w-16 h-16 mx-auto mb-4" />
            <p className="text-lg">아직 추가된 플레이리스트가 없습니다</p>
            <p className="text-sm">
              위의 + 버튼을 눌러서 첫 번째 플레이리스트를 추가해보세요!
            </p>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {customPlaylists.map((playlist, index) => (
            <motion.div
              key={playlist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative group">
                <PlaylistCard playlist={playlist} index={index} />
                <Button
                  onClick={() => handleDeletePlaylist(playlist.id)}
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity z-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* 플레이리스트 추가 다이얼로그 */}
      <AddPlaylistDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAdd={handleAddPlaylist}
        onInvalidUrl={() => setIsToastOpen(true)}
      />

      {/* URL 오류 토스트 알림 */}
      <Toast
        isOpen={isToastOpen}
        onClose={() => setIsToastOpen(false)}
        title="잘못된 URL"
        message="올바른 YouTube URL을 입력해주세요. (예: https://www.youtube.com/watch?v=...)"
        type="error"
        duration={4000}
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
    </div>
  );
};
