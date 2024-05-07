import React from "react";
import { IGame } from "../types";

interface ModalProps {
  selectedGame: IGame;
  currentImageIndex: number;
  closeModal: () => void;
  prevImage: () => void;
  nextImage: () => void;
  changeImage: (index: number) => void;
}

const Modal: React.FC<ModalProps> = ({
  selectedGame,
  currentImageIndex,
  closeModal,
  prevImage,
  nextImage,
  changeImage,
}) => {
  const handleClickOutside = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if ((event.target as HTMLElement).classList.contains("modal")) {
      closeModal();
    }
  };

  return (
    <div className="modal" onClick={handleClickOutside}>
      <div className="modalContent">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <div>
          <img
            loading="lazy"
            className="posterZoom"
            src={
              selectedGame.short_screenshots[currentImageIndex]?.image ||
              selectedGame.background_image
            }
            alt={selectedGame.name}
          />
          <div className="buttons">
            <button onClick={prevImage} disabled={currentImageIndex === 0}>
              Назад
            </button>
            <button
              onClick={nextImage}
              disabled={
                currentImageIndex ===
                (selectedGame.short_screenshots.length || 0) - 1
              }
            >
              Далее
            </button>
          </div>
        </div>
        <div className="slides">
          {selectedGame.short_screenshots.map((screenshot, index) => (
            <img
              key={index}
              className={`slide ${index === currentImageIndex ? "slideActive" : ""}`}
              src={screenshot.image}
              alt={selectedGame.name}
              onClick={() => changeImage(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
