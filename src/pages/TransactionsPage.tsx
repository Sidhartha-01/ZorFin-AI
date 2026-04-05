import React, { useState } from 'react';
import {
  Table,
  Tag,
  Space,
  Typography,
  Input,
  Button,
  Modal,
  message,
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import { useFinanceStore } from '../store/useFinanceStore';
import { useUserStore } from '../store/useUserStore';
import { formatCurrency } from '../utils';
import type { Transaction, TransactionStatus } from '../types';
import dayjs from 'dayjs';
import TransactionModal from '../components/TransactionModal';

import './TransactionsPage.scss';

const { Title, Text } = Typography;

const TransactionsPage: React.FC = () => {
  const { data, addTransaction, updateTransaction, deleteTransaction } =
    useFinanceStore();
  const { role } = useUserStore();
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  const isAdmin = role === 'Admin';

  const categories = [
    'Salary',
    'Food',
    'SaaS',
    'Transport',
    'Utilities',
    'Entertainment',
    'Health',
    'Other',
  ];

  const handleAdd = () => {
    setEditingTransaction(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record: Transaction) => {
    setEditingTransaction(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this transaction?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        deleteTransaction(id);
        message.success('Transaction deleted successfully');
      },
    });
  };

  const handleModalOk = (values: any) => {
    const transactionData = {
      ...values,
      date: values.date.format('YYYY-MM-DD'),
    };

    if (editingTransaction) {
      updateTransaction(editingTransaction.id, transactionData);
      message.success('Transaction updated successfully');
    } else {
      addTransaction({
        ...transactionData,
        id: Math.random().toString(36).substr(2, 9),
      });
      message.success('Transaction added successfully');
    }
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a: Transaction, b: Transaction) =>
        dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => <Tag color="blue">{category}</Tag>,
      filters: categories.map((c) => ({ text: c, value: c })),
      onFilter: (value: any, record: Transaction) => record.category === value,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a: Transaction, b: Transaction) => a.amount - b.amount,
      render: (amount: number, record: Transaction) => (
        <div className={`amount-cell ${record.status}`}>
          {record.status === 'income' ? (
            <CheckCircleOutlined />
          ) : (
            <ArrowDownOutlined />
          )}
          <span>{formatCurrency(amount)}</span>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: TransactionStatus) => (
        <Tag color={status === 'income' ? 'success' : 'error'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Transaction) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            disabled={!isAdmin}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            disabled={!isAdmin}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  const filteredData = data.transactions.filter(
    (t) =>
      t.description.toLowerCase().includes(searchText.toLowerCase()) ||
      t.category.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <div className="transactions-page">
      <div className="transactions-header">
        <div>
          <Title level={2} className="zorfin-gradient-text header-title">
            Transaction Ledger
          </Title>
          <Text className="header-subtitle">
            Manage and track all your financial movements.
          </Text>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="zorfin-btn-primary add-btn"
          onClick={handleAdd}
          disabled={!isAdmin}
        >
          Add Transaction
        </Button>
      </div>

      <div className="ledger-card">
        <div className="ledger-toolbar">
          <Input
            placeholder="Search transactions..."
            prefix={<SearchOutlined style={{ color: '#94a3b8' }} />}
            className="search-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Text className="results-count">
            {filteredData.length} Transactions found
          </Text>
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{ pageSize: 4 }}
          scroll={{ x: 400 }}
          className="zorfin-table"
        />
      </div>

      <TransactionModal
        visible={isModalVisible}
        editingTransaction={editingTransaction}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleModalOk}
        categories={categories}
      />
    </div>
  );
};

export default TransactionsPage;
