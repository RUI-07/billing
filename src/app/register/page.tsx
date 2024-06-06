'use client'
import React from 'react'
import {Button, Form, Input, Space, Typography} from 'react-vant'
import styles from './page.module.css'
import Link from 'next/link'
import {register} from './register'
import {toastResult} from '@/util'

export const Register = () => {
  return (
    <div className={styles.register}>
      <div className={styles.title}>
        <Typography.Title level={2}>注册</Typography.Title>
      </div>
      <Form
        title="注册"
        onFinish={async values => {
          const result = await register(values)
          toastResult(result)
        }}
        footer={
          <Space className={styles.buttons} direction="vertical">
            <Button block type="primary" nativeType="submit">
              确定
            </Button>
            <Link href="/login">
              <Button block>登入</Button>
            </Link>
          </Space>
        }
      >
        <Form.Item label="用户名" name="username">
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item label="密码" name="password">
          <Input placeholder="请输入密码" type="password" />
        </Form.Item>
      </Form>
    </div>
  )
}

export default Register
