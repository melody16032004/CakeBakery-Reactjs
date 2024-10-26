import React, { useState, useEffect } from 'react';
import '../components/Game.css'; // Tạo file CSS để tùy chỉnh kiểu dáng
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const cardImages = [
    { id: 1, src: 'image1.png' },
    { id: 2, src: 'image2.png' },
    { id: 3, src: 'image3.png' },
    { id: 4, src: 'image4.png' },
    { id: 5, src: 'image5.png' },
    { id: 6, src: 'image6.png' },
];

const MemoryGame = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [moves, setMoves] = useState(0);

    useEffect(() => {
        const shuffledCards = [...cardImages, ...cardImages] // Nhân đôi các thẻ
            .sort(() => Math.random() - 0.5) // Xáo trộn thẻ
            .map((card) => ({ ...card, flipped: false }));
        setCards(shuffledCards);
    }, []);

    const flipCard = (index) => {
        if (flippedCards.length < 2 && !cards[index].flipped) {
            const newCards = [...cards];
            newCards[index].flipped = true;
            setFlippedCards((prev) => [...prev, index]);
            setCards(newCards);
            setMoves((prev) => prev + 1);
        }
    };

    useEffect(() => {
        if (flippedCards.length === 2) {
            const [firstIndex, secondIndex] = flippedCards;
            if (cards[firstIndex].id === cards[secondIndex].id) {
                setMatchedCards((prev) => [...prev, cards[firstIndex].id]);
                resetFlippedCards();
            } else {
                setTimeout(resetFlippedCards, 1000);
            }
        }
    }, [flippedCards]);

    const resetFlippedCards = () => {
        const newCards = cards.map((card) => {
            if (!matchedCards.includes(card.id)) {
                return { ...card, flipped: false };
            }
            return card;
        });
        setCards(newCards);
        setFlippedCards([]);
    };

    const resetGame = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, flipped: false }));
        setCards(shuffledCards);
        setFlippedCards([]);
        setMatchedCards([]);
        setMoves(0);
    };

    return (
        <div className="memory-game">
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <button style={{ width: '160px' }}>
                    <Link to='/home' style={{ textDecoration: 'none', color: 'white' }}>Back</Link>
                </button>
                <div style={{ width: '10px' }} />
                <button style={{ width: '160px' }} onClick={resetGame}>Play Again</button>
            </Box>

            <h1>Memory Game</h1>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant='body1' color='textPrimary'>Moves: {moves}</Typography>
                <Typography variant='body1' color='textPrimary'>Matched Cards: {matchedCards.length}</Typography>
            </Box>

            <div className="card-container">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className={`card ${card.flipped || matchedCards.includes(card.id) ? 'flipped' : ''}`}
                        onClick={() => flipCard(index)}
                    >
                        <div className="card-inner"> {/* Thêm class card-inner */}
                            <div className="card-back">?</div>
                            <img src={card.src} alt={`Card ${card.id}`} />
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );

};

export default MemoryGame;
