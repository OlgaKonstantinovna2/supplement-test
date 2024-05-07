import React, { useState, useEffect } from "react";
import axios from "axios";
import { IGame } from "../types";
import Modal from "../components/Modal";
import { Platform, Language, SortBy } from "../enums";
import GameFilters from "../components/GameFilters";
import GameTable from "../components/GameTable";

const GameListPage: React.FC = () => {
  const [games, setGames] = useState<IGame[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(Language.All);
  const [selectedMultiplayer, setSelectedMultiplayer] = useState<boolean>(false);
  const [selectedOnline, setSelectedOnline] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedGame, setSelectedGame] = useState<IGame | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.Name);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(
          "https://run.mocky.io/v3/1a89cc5f-e608-49a3-bf23-9b2ce37a6bc9"
        );
        setGames(response.data.results);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const filterByPlatform = (platform: Platform) => {
    setSelectedPlatform(platform);
  };

  const filterByLanguage = (language: Language) => {
    setSelectedLanguage(language);
  };

  const handleImageClick = (game: IGame) => {
    setSelectedGame(game);
    setCurrentImageIndex(0);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedGame(null);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0
        ? (selectedGame?.short_screenshots.length || 0) - 1
        : prevIndex - 1,
    );
  };

  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex + 1) % (selectedGame?.short_screenshots.length || 0),
    );
  };

  const changeImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const sortedGames = [...games].sort((a, b) => {
    if (sortBy === SortBy.Name) {
      return a.name.localeCompare(b.name);
    } else {
      return b.rating - a.rating;
    }
  });

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <h1>Список игр</h1>
      <GameFilters
        selectedPlatform={selectedPlatform}
        selectedLanguage={selectedLanguage}
        selectedMultiplayer={selectedMultiplayer}
        selectedOnline={selectedOnline}
        filterByPlatform={filterByPlatform}
        filterByLanguage={filterByLanguage}
        setSelectedMultiplayer={setSelectedMultiplayer}
        setSelectedOnline={setSelectedOnline}
      />
      <div className="sort">
        Сортировать по:{" "}
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortBy)}>
          <option value={SortBy.Name}>Названию</option>
          <option value={SortBy.Rating}>Рейтингу</option>
        </select>
      </div>
      <GameTable
        games={sortedGames}
        selectedPlatform={selectedPlatform}
        selectedLanguage={selectedLanguage}
        selectedMultiplayer={selectedMultiplayer}
        selectedOnline={selectedOnline}
        handleImageClick={handleImageClick}
      />
      {modalOpen && selectedGame && (
        <Modal
          selectedGame={selectedGame}
          currentImageIndex={currentImageIndex}
          closeModal={closeModal}
          prevImage={prevImage}
          nextImage={nextImage}
          changeImage={changeImage}
        />
      )}
    </div>
  );
};

export default GameListPage;
