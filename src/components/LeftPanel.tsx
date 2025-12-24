import { useState } from 'react';
import { useStore } from '../store/useStore';
import { ConfirmModal } from './ConfirmModal';
import { Toast, type ToastType } from './Toast';
import './LeftPanel.css';

interface ToastState {
  message: string;
  type: ToastType;
}

export function LeftPanel() {
  const decks = useStore((state) => state.decks);
  const activeDeckId = useStore((state) => state.activeDeckId);
  const setActiveDeck = useStore((state) => state.setActiveDeck);
  const createDeck = useStore((state) => state.createDeck);
  const deleteDeck = useStore((state) => state.deleteDeck);
  const renameDeck = useStore((state) => state.renameDeck);
  const exportDeckToText = useStore((state) => state.exportDeckToText);
  const importDeckFromText = useStore((state) => state.importDeckFromText);

  const activeDeck = decks.find((d) => d.id === activeDeckId);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (message: string, type: ToastType = 'info') => {
    setToast({ message, type });
  };

  const handleStartEdit = () => {
    setEditName(activeDeck?.name ?? '');
    setIsEditing(true);
  };

  const handleFinishEdit = () => {
    if (activeDeckId && editName.trim()) {
      renameDeck(activeDeckId, editName.trim());
    }
    setIsEditing(false);
  };

  const handleImport = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const result = importDeckFromText(text);
      if (result.success) {
        showToast('Deck imported successfully', 'success');
      } else {
        showToast(result.error ?? 'Import failed', 'error');
      }
    } catch {
      showToast('Failed to read clipboard', 'error');
    }
  };

  const handleExport = async () => {
    const text = exportDeckToText();
    if (!text) {
      showToast('No deck to export', 'error');
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      showToast('Deck copied to clipboard', 'success');
    } catch {
      showToast('Failed to copy to clipboard', 'error');
    }
  };

  const handleDeleteClick = () => {
    if (activeDeckId) {
      setShowDeleteModal(true);
    }
  };

  const handleConfirmDelete = () => {
    if (activeDeckId) {
      deleteDeck(activeDeckId);
    }
    setShowDeleteModal(false);
  };

  const handleNewDeck = () => {
    createDeck('New Deck');
  };

  return (
    <div className="left-panel-content">
      {/* Deck Selector */}
      <div className="deck-selector">
        <label className="panel-label">Select Deck</label>
        <select
          className="deck-dropdown"
          value={activeDeckId ?? ''}
          onChange={(e) => setActiveDeck(e.target.value)}
        >
          {decks.map((deck) => (
            <option key={deck.id} value={deck.id}>
              {deck.name}
            </option>
          ))}
        </select>
      </div>

      {/* Deck Name */}
      <div className="deck-name-section">
        <label className="panel-label">Deck Name</label>
        {isEditing ? (
          <input
            className="deck-name-input"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={handleFinishEdit}
            onKeyDown={(e) => e.key === 'Enter' && handleFinishEdit()}
            autoFocus
          />
        ) : (
          <button
            className="deck-name-display"
            onClick={handleStartEdit}
          >
            {activeDeck?.name || 'Untitled Deck'}
          </button>
        )}
      </div>

      {/* Action Buttons */}
      <div className="deck-actions">
        <button className="btn btn-ghost" onClick={handleImport} title="Import from Clipboard">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          Import
        </button>
        <button className="btn btn-ghost" onClick={handleExport} title="Export to Clipboard">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Export
        </button>
        <button className="btn btn-destructive" onClick={handleDeleteClick} title="Delete Deck">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
          Delete
        </button>
      </div>

      {/* New Deck Button */}
      <button className="btn btn-primary new-deck-btn" onClick={handleNewDeck}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        New Deck
      </button>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Deck"
        message={`Are you sure you want to delete "${activeDeck?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
