"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { abi, contractAddress } from "@/lib/abi";
import { baseSepolia } from "viem/chains";
import { formatEther, parseEther } from "viem";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  const {
    data: incompleteMatches,
    isError,
    isLoading,
  } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "getIncompleteMatches",
    chainId: baseSepolia.id,
  });

  const { writeContract: joinMatch } = useWriteContract();

  const handleJoinMatch = (matchId: number, betAmount: bigint) => {
    joinMatch({
      address: contractAddress,
      abi: abi,
      functionName: "joinMatch",
      args: [matchId],
      value: betAmount,
    });
  };

  //const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();

  const readContractResult = useReadContract({
    chainId: baseSepolia.id,
    address: contractAddress,
    abi,
    functionName: "totalMatches",
  });

  const createMatch = () => {
    writeContract({
      address: contractAddress,
      abi: abi,
      functionName: "createMatch",
      value: parseEther("0.001"),
    });
  };

  const getMatchList = () => {
    if (incompleteMatches?.length <= 0) {
      return <div>No active matches found. Please create a new match!</div>;
    } else {
      return incompleteMatches?.map((match, index) => (
        <div key={index}>
          <h3>Match: {match?.matchId.toString()}</h3>
          <a href={`https://sepolia.basescan.org/address/${match?.player1}`}>Player 1</a>
          <p>Bet: {formatEther(match?.bet1)} ETH</p>
          <Button onClick={() => handleJoinMatch(match.matchId, match.bet1)}>Join Match</Button>
        </div>
      ));
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <ConnectButton />
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">CoinFlip 🪙🩴</div>
      </div>
      <div>
        Get started by creating a match or join an existing match
        {readContractResult?.data?.toString()} matches have been played so far.
        <br />
        <Button onClick={createMatch}>Create Match</Button>
      </div>
      <div>
        <h3>Active matches</h3>
        <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-center"></div>
        <div className="grid">
          {isLoading && <p>Loading matches...</p>}
          {isError && <p>Error loading matches.</p>}
          {getMatchList()}
        </div>
      </div>
    </main>
  );
}
