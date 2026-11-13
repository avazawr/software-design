type BookRow = {
  id: number;
  title: string;
  author_name: string;
  is_available: 0 | 1;
  added_at: number;
};

const bookRows: BookRow[] = [
  {
    id: 1,
    title: "Dune",
    author_name: "Frank Herbert",
    is_available: 1,
    added_at: 1730937600,
  },
  {
    id: 2,
    title: "Piranesi",
    author_name: "Susanna Clarke",
    is_available: 1,
    added_at: 1731196800,
  },
  {
    id: 3,
    title: "Kindred",
    author_name: "Octavia E. Butler",
    is_available: 0,
    added_at: 1731024000,
  },
  {
    id: 4,
    title: "Neuromancer",
    author_name: "William Gibson",
    is_available: 0,
    added_at: 1731283200,
  },
  {
    id: 5,
    title: "The Left Hand of Darkness",
    author_name: "Ursula K. Le Guin",
    is_available: 1,
    added_at: 1731110400,
  },
];

type BookResponse = {
  id: number;
  title: string;
  authorName: string;
  addedAt: string;
};

// Pure function: its output depends only on its input.
// and it does not mutate its arguments
function toBookResponse(row: BookRow): BookResponse {
  return {
    id: row.id,
    title: row.title,
    authorName: row.author_name,
    addedAt: new Date(row.added_at * 1000).toISOString(),
  };
}
//console.log(toBookResponse(bookRows[0]!));

// Pure function: its output depends only on its input.
// and it does not mutate its arguments
function getAvailableBooks(rows: BookRow[]): BookResponse[] {
  return rows
    .filter((row) => row.is_available)
    .map((row) => toBookResponse(row));
}
//console.log(getAvailableBooks(bookRows));

// Pure function: its output depends only on its input.
// and it does not mutate its arguments ([...rows])
function sortNewestFirst(rows: BookRow[]): BookRow[] {
  return [...rows].sort((a, b) => b.added_at - a.added_at);
}

// SQL query is executed by the Model.
// The Model passes the response to the Controller.
// getAvailableBooks can be called from the View.

console.log(getAvailableBooks(sortNewestFirst(bookRows)));

console.log(bookRows);
