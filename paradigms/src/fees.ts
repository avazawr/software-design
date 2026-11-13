// SRP printOverdueReport() and getMemberFee() violate the SRP end Separation of Concerns because
// they perform multiple responsibilities: calculating the number of overdue days und calculating the fee.
// DRY printOverdueReport() and getMemberFee() - duplication of the day calculation code s.45-47 und s.67-69

type Loan = {
  memberId: string;
  title: string;
  dueDate: string;
  returnedDate: string | null;
};

type FeeObject = {
  loan: Loan;
  days: number;
  fee: number;
};

const loans: Loan[] = [
  { memberId: "42", title: "Dune", dueDate: "2024-11-15", returnedDate: null },
  {
    memberId: "7",
    title: "Piranesi",
    dueDate: "2024-11-18",
    returnedDate: "2024-11-17",
  },
  {
    memberId: "42",
    title: "Kindred",
    dueDate: "2024-10-20",
    returnedDate: null,
  },
  {
    memberId: "7",
    title: "Neuromancer",
    dueDate: "2024-11-25",
    returnedDate: null,
  },
  {
    memberId: "13",
    title: "The Left Hand of Darkness",
    dueDate: "2024-11-17",
    returnedDate: null,
  },
];

const DAILY_FEE = 50;
const MAX_FEE = 1000;

function calculateFee(daysOverdue: number): number {
  //if (daysOverdue < 0) return 0;
  return Math.min(daysOverdue * DAILY_FEE, MAX_FEE);
}

function getDaysOverdue(loan: Loan, today: string): number {
  return Math.floor(
    (Date.parse(today) - Date.parse(loan.dueDate)) / 86_400_000,
  );
}
function formatEuro(cents: number): string {
  return `${(cents / 100).toFixed(2)} EUR`;
}

function getOverdueLoans(loans: Loan[], today: string) {
  const overdueloans: Loan[] = loans.filter(
    (loan) => loan.returnedDate === null,
  );

  const feesObject: FeeObject[] = [];
  overdueloans.forEach((loan) => {
    let days = getDaysOverdue(loan, today);
    if (days > 0) {
      feesObject.push({
        loan,
        days,
        fee: calculateFee(getDaysOverdue(loan, today)),
      });
    }
  });

  return feesObject;
}

function printOverdueReport(loans: Loan[], today: string): void {
  console.log("Overdue report");

  const feeObjects: FeeObject[] = getOverdueLoans(loans, today);

  for (const feeObject of feeObjects) {
    console.log(
      `${feeObject.loan.title} (member #${feeObject.loan.memberId}): ${feeObject.days} days, ${formatEuro(feeObject.fee)}`,
    );
  }
  let total = feeObjects.reduce((sum, feeObject) => {
    return sum + feeObject.fee;
  }, 0);
  console.log(`Total: ${(total / 100).toFixed(2)} EUR`);
}

function getMemberFee(loans: Loan[], memberId: string, today: string): number {
  return getOverdueLoans(loans, today)
    .filter((feeObject) => feeObject.loan.memberId === memberId)
    .reduce((sum, feeObject) => {
      return sum + feeObject.fee;
    }, 0);
}

printOverdueReport(loans, "2024-11-20");
console.log(getMemberFee(loans, "42", "2024-11-20"));
