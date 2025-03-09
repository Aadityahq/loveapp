import React, { useState, useEffect } from 'react';
import { Heart, Stars, Sparkles, Music, Coffee, Moon, Sun, Cloud, CloudRain, Smile, MessageCircle, Image, Send, X, ChevronLeft, ChevronRight } from 'lucide-react';

function App() {
  const [showMessage, setShowMessage] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMood, setCurrentMood] = useState<string>('');
  const [showMoodPanel, setShowMoodPanel] = useState(false);
  const [memories, setMemories] = useState<string[]>(() => {
    const saved = localStorage.getItem('memories');
    return saved ? JSON.parse(saved) : [];
  });
  const [newMemory, setNewMemory] = useState('');
  const [showMemoryForm, setShowMemoryForm] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hearts, setHearts] = useState<{ id: number; style: React.CSSProperties }[]>([]);
  const [nextHeartId, setNextHeartId] = useState(0);

  const photos = [
    {
      url: "src/images/photo3.jpg",
      caption: "What a beautiful smile😊 you have Babu❤️"
    },
    {
      url: "src/images/IMG_20250127_153123_101.jpg",
      caption: "You're my cutipie Aashu Baby❤️"
    },
    {
      url: "src/images/IMG_20250225_223622_484.jpg",
      caption: "Look at you my sweetheart❤️"
    },
    {
      url: "src/images/IMG_20250225_223613_015.jpg",
      caption: "🎊 Happy Birthday memories 🎊"
    },
    {
      url: "src/images/photo8.jpg",
      caption: "Beautiful day outdoors"
    },
    // {
    //   url: "src/images/IMG_20250225_223634_760.jpg",
    //   caption: "🥰"
    // },
    // {
    //   url: "src/images/6d5ee49870f00152a65e829204fdeb1b.webp",
    //   caption: "🥰"
    // }
    
  ];

  const loveQuotes = [
    "Distance means so little when someone means so much.",
    "Missing you is my heart's way of reminding me how much I love you Aashu.",
    "You're my favorite notification.",
    "Every moment with you is my favorite moment.",
    "You're the first thing on my mind each morning."
  ];

  const moodMessages = {
    happy: ["Your happiness is contagious! Keep smiling, beautiful! 😊", "Your smile brightens my day, even from far away! ✨"],
    sad: ["Remember I'm always here for you. This moment will pass. ❤️", "Sending you the biggest virtual hug right now! 🤗"],
    missing: ["Close your eyes, feel my love surrounding you. I'm thinking of you. 💕", "Distance is temporary, our love is forever. 💑"],
    lonely: ["You're never alone. My heart is always with you. 💖", "Let's count the stars together, even if we're apart. ⭐"]
  };

  const triggerLoveAnimation = () => {
    const newHearts = Array.from({ length: 20 }, (_, i) => ({
      id: nextHeartId + i,
      style: {
        left: `${Math.random() * window.innerWidth}px`,
        bottom: '-20px',
        '--tx': `${(Math.random() - 0.5) * 200}px`,
        '--r': `${(Math.random() - 0.5) * 360}deg`,
        transform: `scale(${0.5 + Math.random()})`,
        color: `hsl(${Math.random() * 40 + 340}, 100%, 50%)`,
      } as React.CSSProperties,
    }));

    setHearts(newHearts);
    setNextHeartId(nextHeartId + 20);

    setTimeout(() => {
      setHearts([]);
    }, 4000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % loveQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(slideInterval);
  }, []);

  useEffect(() => {
    localStorage.setItem('memories', JSON.stringify(memories));
  }, [memories]);

  const handleMoodSelection = (mood: string) => {
    setCurrentMood(mood);
    setShowMoodPanel(true);
  };

  const addMemory = () => {
    if (newMemory.trim()) {
      setMemories([...memories, newMemory]);
      setNewMemory('');
      setShowMemoryForm(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % photos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 p-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 gap-6">
        {/* Love Forever Button */}
        <button
          onClick={triggerLoveAnimation}
          className="bg-gradient-to-r from-pink-500 to-red-500 text-white py-4 px-8 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
        >
          <Heart className="w-6 h-6 animate-pulse" fill="currentColor" />
          <span>Love You Forever</span>
          <Heart className="w-6 h-6 animate-pulse" fill="currentColor" />
        </button>

        {/* Floating Hearts */}
        {hearts.map(heart => (
          <div
            key={`heart-${heart.id}`}
            className="floating-heart"
            style={heart.style}
          >
            <Heart className="w-8 h-8" fill="currentColor" />
          </div>
        ))}

        {/* Photo Slideshow */}
        <div className="photo-frame">
          <div className="relative h-[600px] rounded-xl overflow-hidden z-10">
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src={photos[currentSlide].url} 
                alt={photos[currentSlide].caption}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-xl font-medium text-center">
                {photos[currentSlide].caption}
              </p>
            </div>

            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 p-2 rounded-full hover:bg-white/50 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 p-2 rounded-full hover:bg-white/50 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {photos.map((_, index) => (
                <button
                  key={`slide-dot-${index}`}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mood and Interaction Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mood Selection */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold mb-4">How are you feeling today?</h3>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleMoodSelection('happy')}
                className="flex items-center justify-center space-x-2 p-4 bg-yellow-100 rounded-lg hover:bg-yellow-200 transition-colors"
              >
                <Sun className="w-5 h-5 text-yellow-500" />
                <span>Happy</span>
              </button>
              <button 
                onClick={() => handleMoodSelection('sad')}
                className="flex items-center justify-center space-x-2 p-4 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <CloudRain className="w-5 h-5 text-blue-500" />
                <span>Sad</span>
              </button>
              <button 
                onClick={() => handleMoodSelection('missing')}
                className="flex items-center justify-center space-x-2 p-4 bg-pink-100 rounded-lg hover:bg-pink-200 transition-colors"
              >
                <Heart className="w-5 h-5 text-pink-500" />
                <span>Missing You</span>
              </button>
              <button 
                onClick={() => handleMoodSelection('lonely')}
                className="flex items-center justify-center space-x-2 p-4 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors"
              >
                <Moon className="w-5 h-5 text-purple-500" />
                <span>Lonely</span>
              </button>
            </div>
          </div>

          {/* Memory Wall */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Our Memory Wall</h3>
              <button 
                onClick={() => setShowMemoryForm(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
              >
                <Image className="w-4 h-4" />
                <span>Add Memory</span>
              </button>
            </div>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {memories.map((memory, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">{memory}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mood Message Panel */}
      {showMoodPanel && currentMood && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">A Message For You</h3>
              <button 
                onClick={() => setShowMoodPanel(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-lg text-center mb-4">
              {moodMessages[currentMood as keyof typeof moodMessages]?.[
                Math.random() * moodMessages[currentMood as keyof typeof moodMessages].length | 0
              ]}
            </p>
            <div className="flex justify-center">
              <button 
                onClick={() => setShowMoodPanel(false)}
                className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
              >
                Thank you ❤️
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Memory Form */}
      {showMemoryForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Add a Special Memory</h3>
              <button 
                onClick={() => setShowMemoryForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <textarea
              value={newMemory}
              onChange={(e) => setNewMemory(e.target.value)}
              placeholder="Write about a special moment we shared..."
              className="w-full h-32 p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowMemoryForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button 
                onClick={addMemory}
                className="flex items-center space-x-2 px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Save Memory</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;