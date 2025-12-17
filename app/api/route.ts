import { db } from "~/db";
import { products } from "~/db/schema";

export async function GET() {
  const startTime = new Date("2025-11-01").getTime();
  const endTime = new Date("2025-12-30").getTime();

  await db.insert(products).values(
    Array.from({ length: 57 }).map((_, index) => ({
      userId: "R5LLUGsKwwuZ8AqUYuUgKMERxIISWKcT",
      name: `Product ${index + 1}`,
      price: parseFloat((Math.random() * 100).toFixed(2)),
      description: generateDescription(),
      quantity: Math.ceil(Math.random() * 120),
      lowStockThreshold: Math.ceil(Math.random() * 20),
      createdAt: new Date(startTime + Math.random() * (endTime - startTime)),
    }))
  );
}

const adjectives = [
  "amazing",
  "fantastic",
  "mysterious",
  "incredible",
  "bizarre",
];
const nouns = ["adventure", "journey", "experience", "story", "situation"];
const verbs = ["awaits", "unfolds", "happens", "emerges", "begins"];
const places = [
  "in the forest",
  "on the mountain",
  "under the sea",
  "in a small village",
  "in a distant galaxy",
];
const extras = [
  "with unexpected twists",
  "full of surprises",
  "that changes everything",
  "beyond imagination",
  "that no one expects",
];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateDescription() {
  // 30% chance to return nothing
  if (Math.random() < 0.3) return null;

  // Decide number of sentences (1-3)
  const numSentences = Math.floor(Math.random() * 3) + 1;
  let description = "";

  for (let i = 0; i < numSentences; i++) {
    const sentenceType = Math.floor(Math.random() * 3); // random sentence structure

    let sentence = "";
    switch (sentenceType) {
      case 0:
        sentence = `A ${getRandom(adjectives)} ${getRandom(nouns)} ${getRandom(
          verbs
        )} ${getRandom(places)}.`;
        break;
      case 1:
        sentence = `In a ${getRandom(adjectives)} twist, ${getRandom(
          nouns
        )} ${getRandom(verbs)} ${getRandom(places)}.`;
        break;
      case 2:
        sentence = `${getRandom(nouns)} ${getRandom(verbs)} ${getRandom(
          places
        )} ${getRandom(extras)}.`;
        break;
    }

    description += sentence + " ";
  }

  return description.trim();
}
