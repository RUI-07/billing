'use client'
import React from 'react'
import {Button, Form, Input, Space, Typography} from 'react-vant'
import styles from './page.module.css'
import Link from 'next/link'
import {login} from './login'
import {toastResult} from '@/util'

export const Login = () => {
  return (
    <div className={styles.login}>
      <div className={styles.title}>
        <Typography.Title level={2}>登入</Typography.Title>
      </div>
      <Form
        title="登入"
        footer={
          <Space className={styles.buttons} direction="vertical">
            <Button block type="primary" nativeType="submit">
              确定
            </Button>
            <Link href="/register">
              <Button block>注册</Button>
            </Link>
          </Space>
        }
        onFinish={async values => {
          const result = await login(values)
          toastResult(result)
        }}
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

export default Login
