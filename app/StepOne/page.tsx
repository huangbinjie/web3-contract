'use client'
import { Button, Form, message, InputNumber } from 'antd'
import { mint } from '../web3'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { push } = useRouter()
  const [messageApi, contextHolder] = message.useMessage()
  async function handleMint(amount: number) {
    try {
      messageApi.open({
        type: 'loading',
        content: 'Minting',
        duration: 0,
      })
      await mint(amount)
      messageApi.destroy()
      messageApi.open({ type: 'success', content: 'Mint Successed' })
      push(`/StepTwo?amount=${amount}`)
    } catch {
      messageApi.destroy()
      messageApi.open({ type: 'error', content: 'Mint Failed' })
    }
  }
  return (
    <>
      {contextHolder}
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={(values) => {
          handleMint(values.amount)
        }}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Mint Tokens
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
