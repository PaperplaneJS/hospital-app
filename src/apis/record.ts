import { client } from '@/utils/client'

/** 提交新建一条记录 */
export async function postRecordApi(record: IRawRecord): Promise<{ result: string }> {
  return client.post('/addRecord', { data: record })
}
