import clsx from "clsx";

export interface Card {
  id: string;
  balance: number;
  cardNumber: string;
  spendingLimit: number;
  brand: string;
}

export interface Props extends Card {
  selectedCard: string;
  setSelectedCard: (id: string) => void;
}

export const Card = ({
  id,
  balance,
  cardNumber,
  setSelectedCard,
  selectedCard,
  brand,
}: Props) => {
  return (
    <button
      className={clsx(
        "border rounded-md flex flex-col p-6 gap-6 hover:scale-105 transition-all hover:shadow-md",
        selectedCard === id &&
          "bg-gradient-to-br from-white via-indigo-600/30 to-blue-600/40 border-blue-600/0"
      )}
      onClick={() => {
        setSelectedCard(id);
      }}
    >
      <div className="flex gap-2 items-start justify-between w-full">
        <div className="flex flex-col gap-2 text-left">
          <span className="leading-4 ">Balance</span>
          <div className="text-3xl">{balance}€</div>
        </div>
        <img src={`/${brand}.png`} className="h-5" />
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2 text-lg">
          <span>****</span>
          <span>****</span>
          <span>****</span>
          <span>{cardNumber.slice(-5)}</span>
        </div>
      </div>
    </button>
  );
};
