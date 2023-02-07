//插件API
import request from './request'
/**
 * @description: 获取列表
 * keywords: str
 */
export function apiGetList(params) {
	return request({
		url: '/cloudsearch',
		method: 'get',
		params,
	})
}
/**
 * @description: 获取歌曲下载地址
 * 必选参数 : id : 音乐 id (仅支持单首歌曲)
 * 可选参数 : br : 码率, 默认设置了 999000 即最大码率, 如果要 320k 则可设置为 320000, 其他类推
 */
export function apiDownloadUrl(params) {
	return request({
		url: '/song/download/url',
		method: 'get',
		params,
	})
}
/**
 * @description: 每日60s
 * keywords: str
 */
export function api60s(params) {
	return request({
		baseURL:'https://api.vvhan.com',
		url: '/api/60s',
		method: 'get',
		params,
	})
}