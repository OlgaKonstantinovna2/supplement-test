import React from "react";
import { IGame, IPlatform } from "../types";
import { Platform, Language } from "../enums";

interface Props {
    games: IGame[];
    selectedPlatform: Platform | null;
    selectedLanguage: Language;
    selectedMultiplayer: boolean;
    selectedOnline: boolean;
    handleImageClick: (game: IGame) => void;
}

const GameTable: React.FC<Props> = ({
    games,
    selectedPlatform,
    selectedLanguage,
    selectedMultiplayer,
    selectedOnline,
    handleImageClick,
}) => {
    const isMultiplayerGame = (game: IGame) => {
        const multiplayerTags = ["Multiplayer", "Co-op", "Online Co-Op", "PvP"];
        return game.tags.some((tag) => multiplayerTags.includes(tag.name));
    };

    const isOnlineGame = (game: IGame) => {
        const onlineTags = ["Online", "Online Co-Op", "PvP"];
        return game.tags.some((tag) => onlineTags.includes(tag.name));
    };

    const filteredGames = games.filter((game) => {
        if (
            selectedPlatform &&
            !game.platforms.some((platform: IPlatform) =>
                platform.platform.name.includes(selectedPlatform),
            )
        ) {
            return false;
        }
        if (selectedLanguage !== Language.All && game.language !== "ru") {
            return false;
        }
        if (selectedMultiplayer && !isMultiplayerGame(game)) {
            return false;
        }
        if (selectedOnline && !isOnlineGame(game)) {
            return false;
        }
        return true;
    });

    return (
        <table className="table">
            <thead>
                <tr>
                    <th></th>
                    <th>Название</th>
                    <th>Рейтинг</th>
                    <th>Платформы</th>
                    <th>Язык</th>
                    <th>Теги</th>
                </tr>
            </thead>
            <tbody>
                {filteredGames.map((game, index) => (
                    <tr key={index}>
                        <td>
                            <img
                                className="poster"
                                src={game.background_image}
                                alt={game.name}
                                onClick={() => handleImageClick(game)}
                            />
                        </td>
                        <td>{game.name}</td>
                        <td>{game.rating}</td>
                        <td>
                            {game.platforms
                                .map((platform: IPlatform) => platform.platform.name)
                                .join(", ")}
                        </td>
                        <td>{game.language === "eng" ? "Английский" : "Русский"}</td>
                        <td>{game.tags.map((tag) => tag.name).join(", ")}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default GameTable;
