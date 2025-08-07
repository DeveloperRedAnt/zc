import { Button } from '@/components/button/button';
import { Card } from '@/components/card/card';
import React, { useState } from 'react';
import { StopAddOnModal } from './popup-stop-addon';

interface CardData {
  title: string;
  quantity: string;
  buttonText: string;
  buttonColor?: 'red' | 'blue' | 'gray';
}

interface CardAddOnProps {
  cards: CardData[];
}

export default function CardAddOn({ cards }: CardAddOnProps) {
  const getButtonColorClasses = (color = 'gray') => {
    const colorMap = {
      red: 'text-red-400 hover:text-red-500',
      blue: 'text-blue-500 hover:text-blue-600',
      gray: 'text-gray-500 hover:text-gray-600',
    };
    return colorMap[color] || colorMap.gray;
  };

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  return (
    <div className="w-full px-4 md:px-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card) => (
        <Card key={card.title} className="relative">
          <div className="flex items-center justify-between h-full p-4">
            {/* Left: Title + Quantity */}
            <div>
              <h6 className="text-gray-900 font-semibold text-sm mb-1">{card.title}</h6>
              <p className="text-gray-600 text-xs">{card.quantity}</p>
            </div>

            {/* Right: Button */}
            <div>
              <Button
                variant="ghost"
                className={`text-xs font-medium transition-colors duration-200 ${getButtonColorClasses(
                  card.buttonColor
                )}`}
                onClick={() => setIsPopUpOpen(true)}
              >
                {card.buttonText}
              </Button>
            </div>
          </div>
        </Card>
      ))}
      <StopAddOnModal open={isPopUpOpen} onOpenChange={setIsPopUpOpen} />
    </div>
  );
}
