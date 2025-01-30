import React from 'react';
import { Paginator } from 'primereact/paginator';
import "../../style/Paginator.css"

interface PaginationComponentProps {
  first: number;
  rows: number;
  totalRecords: number;
  onPageChange: (event: { first: number; rows: number }) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  first,
  rows,
  totalRecords,
  onPageChange
}) => {
  return (
    <div className="pagination-container">
      <Paginator 
        first={first}
        rows={rows}
        totalRecords={totalRecords}
        onPageChange={onPageChange}
        className="p-jc-center"
        template="PrevPageLink PageLinks NextPageLink"
        // מגדירים כאן את תבנית הדפים המופיעים
        pageLinkSize={3}  // מאפשר להציג רק 3 עמודים, עדיף לסמן 3 דפים כאן
      />
    </div>
  );
};

export default PaginationComponent;
