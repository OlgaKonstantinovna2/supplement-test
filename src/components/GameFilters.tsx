import React from "react";
import { Platform, Language } from "../enums";

interface Props {
    selectedPlatform: Platform | null;
    selectedLanguage: Language;
    selectedMultiplayer: boolean;
    selectedOnline: boolean;
    filterByPlatform: (platform: Platform) => void;
    filterByLanguage: (language: Language) => void;
    setSelectedMultiplayer: (value: boolean) => void;
    setSelectedOnline: (value: boolean) => void;
}

const GameFilters: React.FC<Props> = ({
    selectedPlatform,
    selectedLanguage,
    selectedMultiplayer,
    selectedOnline,
    filterByPlatform,
    filterByLanguage,
    setSelectedMultiplayer,
    setSelectedOnline,
}) => {
    return (
        <div className="filters">
            <div className="filterSection">
                <h2>Отфильтровать по платформе</h2>
                {Object.values(Platform).map((platform) => (
                    <button
                        key={platform}
                        className={selectedPlatform === platform ? "activeFilter" : ""}
                        onClick={() => filterByPlatform(platform)}
                    >
                        {platform}
                    </button>
                ))}
            </div>
            <div className="filterSection">
                <h2>Отфильтровать по языку</h2>
                {Object.values(Language).map((language) => (
                    <button
                        key={language}
                        className={selectedLanguage === language ? "activeFilter" : ""}
                        onClick={() => filterByLanguage(language)}
                    >
                        {language}
                    </button>
                ))}
            </div>
            <div className="filterSection">
                <h2>Многопользовательская игра</h2>
                <input
                    type="checkbox"
                    checked={selectedMultiplayer}
                    onChange={(e) => setSelectedMultiplayer(e.target.checked)}
                />
                Многопользовательская
            </div>
            <div className="filterSection">
                <h2>Игра онлайн</h2>
                <input
                    type="checkbox"
                    checked={selectedOnline}
                    onChange={(e) => setSelectedOnline(e.target.checked)}
                />
                Онлайн
            </div>
        </div>
    );
};

export default GameFilters;
