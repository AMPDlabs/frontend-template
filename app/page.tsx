"use client";

import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { abi, contractAddress } from "@/lib/abi";
import { baseSepolia } from "viem/chains";
import { formatEther, parseEther } from "viem";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, OpenInNewWindowIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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
        <Card className="m-2" key={index}>
          <CardHeader>
            <CardTitle>Match: {match?.matchId.toString()}</CardTitle>
            <CardDescription>
              <a target="_blank" href={`https://sepolia.basescan.org/address/${match?.player1}`}>
                <Button variant="outline">
                  <OpenInNewWindowIcon className="mr-2" />
                  Player 1
                </Button>
              </a>
            </CardDescription>
            <CardDescription>Bet: {formatEther(match?.bet1)}ETH</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full" onClick={() => handleJoinMatch(match.matchId, match.bet1)}>
              <CheckIcon className="mr-2" />
              Join Match
            </Button>
          </CardFooter>
        </Card>
      ));
    }
  };

  return (
    <main className="min-h-screen dark:bg-gradient-to-r dark:from-black dark:via-indigo-900 dark:to-black bg-gradient-to-b from-stone-50 to-rose-50">
      <div className="flex flex-col items-center">
        <h1 className="mt-24 lg:text-4xl sm:text-3xl text-lg">
          Welcome to the <b className="lg:text-4xl sm:text-3xl text-xl uppercase">template</b>
        </h1>
        <p className="max-w-2xl text-center opacity-80 pl-8 pr-8 pt-2 sm:text-base text-xs">
          This NextJs template is setup to use <a href="https://ui.shadcn.com/">⚫️ shadcn/ui</a>, <a href="https://github.com/rainbow-me/rainbowkit">🌈 RainbowKit</a> and <a href="https://wagmi.sh/">🟣🩵 wagmi.sh</a>. It also comes equipped with a light and dark mode toggle setup ☀️🌕 and read/write
          integration with smart contract, enjoy 🤝.
        </p>
        <div className="mt-12">
          <Badge>{readContractResult?.data?.toString()}</Badge> matches have been played so far.
          <div className="flex items-center justify-center mt-2">
            <Button onClick={createMatch}>
              <PlusCircledIcon className="mr-2" />
              Create Match
            </Button>
          </div>
        </div>
        <div className="mt-8">
          <div className="mb-32 justify-center items-center text-center flex flex-wrap">
            {isLoading && <p>Loading matches...</p>}
            {isError && <p>Error loading matches.</p>}
            {getMatchList()}
          </div>
        </div>
      </div>
    </main>
  );
}
