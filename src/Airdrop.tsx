import { useState, ChangeEvent } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { useToast } from "@/hooks/use-toast";

type ToastVariant = "success" | "error" | "info" | "warning";

interface ToastMessage {
  title: string;
  description: string;
  variant: ToastVariant;
}

const toastStyles = {
  base: "p-4 rounded-lg shadow-lg transition duration-300",
  glossy: "bg-opacity-80 backdrop-filter backdrop-blur-lg",
  variants: {
    success: "bg-gradient-to-r from-green-400 to-green-600 text-white border border-green-600",
    error: "bg-gradient-to-r from-red-400 to-red-600 text-white border border-red-600",
    info: "bg-gradient-to-r from-blue-400 to-blue-600 text-white border border-blue-600",
    warning: "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black border border-yellow-600",
  },
};

export function Airdrop(): JSX.Element {
  const [amount, setAmount] = useState<string>("");
  const wallet = useWallet();
  const { connection } = useConnection();
  const { toast } = useToast();

  const showToast = ({ title, description, variant }: ToastMessage): void => {
    const combinedClassName = `${toastStyles.base} ${toastStyles.glossy} ${toastStyles.variants[variant]}`;
    toast({
      title,
      description,
      variant: variant === "success" ? "default" : "destructive",
      className: combinedClassName,
      duration: 5000,
    });
  };

  const validateAmount = (input: string): number | null => {
    const lamports = parseInt(input) * 1_000_000_000;
    return isNaN(lamports) || lamports <= 0 ? null : lamports;
  };

  const sendAirdropToUser = async (): Promise<void> => {
    if (!wallet.publicKey) {
      showToast({
        title: "No Wallet Connected",
        description: "Please connect your wallet to receive an airdrop.",
        variant: "error",
      });
      return;
    }

    const lamports = validateAmount(amount);
    if (lamports === null) {
      showToast({
        title: "Invalid Amount",
        description: "Please enter a valid amount of SOL.",
        variant: "error",
      });
      return;
    }

    try {
      await connection.requestAirdrop(wallet.publicKey, lamports);
      showToast({
        title: "Airdrop Sent!",
        description: `Airdrop of ${amount} SOL sent!`,
        variant: "success",
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      console.error(error);
      showToast({
        title: "Error Sending Airdrop",
        description: errorMessage,
        variant: "error",
      });
    }
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setAmount(e.target.value);
  };

  return (
    <div className="text-center">
      <Input
        type="text"
        placeholder="Enter Amount in SOL"
        className="mb-4 bg-gray-800 text-white border border-gray-600 rounded-lg shadow-lg focus:ring focus:ring-cyan-500 transition duration-200"
        value={amount}
        onChange={handleAmountChange}
      />
      <Button
        onClick={sendAirdropToUser}
        disabled={!wallet.publicKey}
        className={`${
          !wallet.publicKey
            ? "bg-gray-600"
            : "bg-gradient-to-r from-green-500 to-blue-500"
        } text-white w-full py-3 rounded-full shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-xl`}
      >
        Send Airdrop
      </Button>
    </div>
  );
}
