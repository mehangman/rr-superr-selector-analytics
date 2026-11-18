import React, { useState, useMemo } from 'react';
import { ArrowUpDown, ChevronDown, ChevronUp, Download } from 'lucide-react';

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  render?: (row: T, index: number) => React.ReactNode;
  getValue?: (row: T) => any;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
  highlightFirst?: boolean;
  exportFilename?: string;
  selectedIds?: string[];
  onSelectRow?: (row: T, isSelected: boolean) => void;
  getRowId?: (row: T) => string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  onRowClick,
  highlightFirst = true,
  exportFilename = 'analytics_export.csv',
  selectedIds,
  onSelectRow,
  getRowId,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDir === 'asc') setSortDir('desc');
      else {
        setSortKey(null);
        setSortDir('asc');
      }
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    const col = columns.find((c) => c.key === sortKey);

    return [...data].sort((a, b) => {
      let aVal = col?.getValue ? col.getValue(a) : a[sortKey];
      let bVal = col?.getValue ? col.getValue(b) : b[sortKey];

      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
      }

      aVal = String(aVal).toLowerCase();
      bVal = String(bVal).toLowerCase();
      return sortDir === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });
  }, [data, sortKey, sortDir, columns]);

  const exportCSV = () => {
    const headers = columns.map((c) => `"${c.label}"`).join(',');
    const rows = sortedData.map((row) => {
      return columns
        .map((c) => {
          const val = c.getValue ? c.getValue(row) : row[c.key];
          return val !== null && val !== undefined ? `"${val}"` : '""';
        })
        .join(',');
    });

    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', exportFilename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#0d1224] rounded-xl border border-gray-800/80 overflow-hidden shadow-xl">
      <div className="p-3 md:p-4 bg-[#090d1a] border-b border-gray-800/80 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Showing {sortedData.length} Entries
        </span>
        <button
          onClick={exportCSV}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs font-medium text-gray-200 transition-colors border border-gray-700/60 cursor-pointer"
          title="Export CSV"
        >
          <Download className="w-3.5 h-3.5 text-[#f472b6]" />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs md:text-sm">
          <thead>
            <tr className="bg-[#121830]/90 text-gray-400 border-b border-gray-800/80 uppercase text-[11px] font-semibold tracking-wider">
              {onSelectRow && <th className="py-3 px-3 w-10 text-center">Sel</th>}
              {columns.map((col) => {
                const isSorted = sortKey === col.key;
                const alignClass =
                  col.align === 'right'
                    ? 'text-right'
                    : col.align === 'center'
                    ? 'text-center'
                    : 'text-left';

                return (
                  <th
                    key={col.key}
                    onClick={() => col.sortable !== false && handleSort(col.key)}
                    className={`py-3 px-4 transition-colors select-none ${alignClass} ${
                      col.sortable !== false
                        ? 'cursor-pointer hover:text-white hover:bg-gray-800/40'
                        : ''
                    }`}
                  >
                    <div
                      className={`inline-flex items-center gap-1.5 ${
                        col.align === 'right'
                          ? 'justify-end'
                          : col.align === 'center'
                          ? 'justify-center'
                          : 'justify-start'
                      }`}
                    >
                      <span>{col.label}</span>
                      {col.sortable !== false && (
                        <span className="text-gray-500">
                          {isSorted ? (
                            sortDir === 'asc' ? (
                              <ChevronUp className="w-3.5 h-3.5 text-[#f472b6]" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5 text-[#f472b6]" />
                            )
                          ) : (
                            <ArrowUpDown className="w-3 h-3 opacity-40 hover:opacity-100" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {sortedData.map((row, index) => {
              const isFirst = highlightFirst && index === 0 && !sortKey;
              const rowId = getRowId ? getRowId(row) : String(index);
              const isSelected = selectedIds?.includes(rowId);

              return (
                <tr
                  key={rowId}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`transition-colors duration-150 ${
                    onRowClick ? 'cursor-pointer' : ''
                  } ${
                    isFirst
                      ? 'bg-[#e91e8c]/5 hover:bg-[#e91e8c]/10'
                      : index % 2 === 0
                      ? 'bg-[#0d1224] hover:bg-gray-800/40'
                      : 'bg-[#0a0f1e] hover:bg-gray-800/40'
                  } ${isSelected ? 'ring-1 ring-[#e91e8c]' : ''}`}
                >
                  {onSelectRow && (
                    <td
                      className="py-3 px-3 text-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectRow(row, !isSelected);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected || false}
                        onChange={() => {}}
                        className="w-4 h-4 rounded border-gray-700 bg-gray-900 text-[#e91e8c] focus:ring-[#e91e8c] cursor-pointer"
                      />
                    </td>
                  )}
                  {columns.map((col) => {
                    const alignClass =
                      col.align === 'right'
                        ? 'text-right'
                        : col.align === 'center'
                        ? 'text-center'
                        : 'text-left';

                    const content = col.render
                      ? col.render(row, index)
                      : col.getValue
                      ? col.getValue(row)
                      : row[col.key];

                    return (
                      <td
                        key={col.key}
                        className={`py-3 px-4 text-gray-300 font-medium ${alignClass}`}
                      >
                        {content}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
