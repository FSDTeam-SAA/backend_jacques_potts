import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { format } from "date-fns";
import { Eye } from "lucide-react";
import type { EscrowTransaction } from "@/types/escrow";
import EscrowStatusBadge from "./EscrowStatusBadge";
import EscrowTransactionDetails from "./EscrowTransactionDetails";

interface EscrowTransactionListProps {
  transactions: EscrowTransaction[];
  isLoading: boolean;
}

const EscrowTransactionList = ({ transactions, isLoading }: EscrowTransactionListProps) => {
  const [selectedTransaction, setSelectedTransaction] = useState<EscrowTransaction | null>(null);

  if (isLoading) {
    return <div>Loading transactions...</div>;
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Listing</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Last Action</TableHead>
            <TableHead>Next Deadline</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-mono">{transaction.id.slice(0, 8)}</TableCell>
              <TableCell>{transaction.listing?.business_name || 'N/A'}</TableCell>
              <TableCell>${transaction.amount.toLocaleString()}</TableCell>
              <TableCell>
                <EscrowStatusBadge status={transaction.status} />
              </TableCell>
              <TableCell>
                <Badge variant="outline">{transaction.workflow_stage}</Badge>
              </TableCell>
              <TableCell>
                {transaction.last_action_at ? 
                  format(new Date(transaction.last_action_at), 'MMM d, yyyy') : 
                  'N/A'
                }
              </TableCell>
              <TableCell>
                {transaction.next_action_deadline ? 
                  format(new Date(transaction.next_action_deadline), 'MMM d, yyyy') : 
                  'N/A'
                }
              </TableCell>
              <TableCell>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setSelectedTransaction(transaction)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-[800px] sm:w-[600px]">
                    <SheetHeader>
                      <SheetTitle>Transaction Details</SheetTitle>
                    </SheetHeader>
                    {selectedTransaction && (
                      <EscrowTransactionDetails transaction={selectedTransaction} />
                    )}
                  </SheetContent>
                </Sheet>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default EscrowTransactionList;