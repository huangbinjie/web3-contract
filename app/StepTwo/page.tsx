'use client'
import { Button, Form, Input, message } from 'antd'
import { useSearchParams } from 'next/navigation'
import { isAddress } from 'web3-validator'

import { transfer } from '../web3'

export default function Home() {
  const [messageApi, contextHolder] = message.useMessage()
  const searchParams = useSearchParams()
  async function handleSubmit(toAddress: string) {
    const amountStr = searchParams.get('amount')
    if (amountStr == null) return
    const amount = +amountStr
    if (Number.isNaN(amount)) return
    try {
      messageApi.open({
        type: 'loading',
        content: 'Transferring',
        duration: 0,
      })
      await transfer(toAddress, +amount)
      messageApi.destroy()
      messageApi.open({ type: 'success', content: 'Transfer Successed' })
    } catch {
      messageApi.destroy()
      messageApi.open({ type: 'error', content: 'Transfer Failed' })
    }
  }
  async function validateAddress(_: any, value: string) {
    if (!isAddress(value)) throw new Error('Address is invalid')
  }
  return (
    <>
      {contextHolder}
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={(values) => handleSubmit(values.toAddress)}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Recipient’s address"
          name="toAddress"
          required
          rules={[{ validator: validateAddress }]}
        >
          <Input width={300} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Transfer Tokens
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
