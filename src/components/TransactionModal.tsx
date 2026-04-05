import React from 'react';
import { Modal, Form, Input, Row, Col, InputNumber, Select, DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { Transaction } from '../types';

interface TransactionModalProps {
  visible: boolean;
  editingTransaction: Transaction | null;
  onCancel: () => void;
  onOk: (values: any) => void;
  categories: string[];
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  visible,
  editingTransaction,
  onCancel,
  onOk,
  categories,
}) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (visible) {
      if (editingTransaction) {
        form.setFieldsValue({
          ...editingTransaction,
          date: dayjs(editingTransaction.date),
        });
      } else {
        form.resetFields();
      }
    }
  }, [visible, editingTransaction, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      onOk(values);
    });
  };

  return (
    <Modal
      title={editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText={editingTransaction ? 'Update' : 'Add'}
      destroyOnClose
    >
      <Form form={form} layout="vertical" initialValues={{ status: 'expense', date: dayjs() }}>
        <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter description' }]}>
          <Input placeholder="e.g. Monthly Rent" />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="amount" label="Amount" rules={[{ required: true, message: 'Please enter amount' }]}>
              <InputNumber className="w-full" min={0} placeholder="0" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="status" label="Type" rules={[{ required: true }]}>
              <Select
                options={[
                  { value: 'income', label: 'Income' },
                  { value: 'expense', label: 'Expense' },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="category" label="Category" rules={[{ required: true }]}>
              <Select
                placeholder="Select category"
                options={categories.map(c => ({ value: c, label: c }))}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="date" label="Date" rules={[{ required: true }]}>
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default TransactionModal;
