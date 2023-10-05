import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const res = await fetch(process.env.PATH_URL_BACKEND+'/api/posts', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const result = await res.json()
  return NextResponse.json({ result })
}
export async function POST(request: NextRequest) {
  const body = await request.json()
  const res = await fetch(process.env.PATH_URL_BACKEND+'/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await res.json();
  return NextResponse.json(data)

}