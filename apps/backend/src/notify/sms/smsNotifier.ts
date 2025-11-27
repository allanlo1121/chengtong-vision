import axios, { AxiosResponse } from "axios";
import crypto from "crypto";

/* ---------------------------------------------------------
 * 1. 类型定义
 * --------------------------------------------------------- */

/** 单条短信发送参数 */
export interface SmsSendParams {
    endpoint?: string;
    username?: string;
    password?: string;
    mobiles?: string[];
    prefix?: string;     // ⭐ 可以自定义短信前缀
    content: string;
    scheduleTime?: string; // yyyy-MM-dd HH:mm:ss
}

/** 配置类型 */
export interface SmsConfig {
    endpoint: string;
    username: string;
    password: string;
    mobiles: string[];
    prefix: string; // ⭐ 默认前缀
}

/** API 返回值类型 */
export interface SmsApiResponse {
    code: number;
    message: string;
    data?: unknown;
}

/* ---------------------------------------------------------
 * 2. 默认配置
 * --------------------------------------------------------- */

export const DEFAULT_SMS_CONFIG: SmsConfig = {
    endpoint: "https://back.aichitu.com/api/vi/sendMessage",
    username: "13636685581",
    password: "$2a$10$oIIKUzCeEDG2F2eCCJuV2eLMbNdRSBe3Ni6PiWkxqoCf0db7PnT7m",
    mobiles: ["13636685581", "18200238495", "13540677814"],
    prefix: "【百事通】",   // ⭐ 默认短信签名（支持自定义）
};

/* ---------------------------------------------------------
 * 3. HMAC 签名
 * --------------------------------------------------------- */

export function buildSignature(
    username: string,
    password: string,
    timestamp: string
): string {
    const payload = `${username}${password}${timestamp}`;
    return crypto
        .createHmac("sha256", "chituyunxin")
        .update(payload)
        .digest("hex");
}

/* ---------------------------------------------------------
 * 4. 主发送函数（已支持 prefix）
 * --------------------------------------------------------- */

export async function sendSmsNotification(
    mobiles: string[] | string,
    content: string,              // 内容
    prefix: string = DEFAULT_SMS_CONFIG.prefix
): Promise<SmsApiResponse> {
    // 如果输入是单个手机号，转为数组
    const mobileList = Array.isArray(mobiles) ? mobiles : [mobiles];

    if (mobileList.length === 0) {
        throw new Error("Mobiles must be a non-empty array");
    }
    if (!content) throw new Error("Missing SMS content");

    // ⭐ 填充短信内容：前缀 + 内容
    const finalContent = `${prefix} ${content}`;

    const timestamp = Date.now().toString();
    const signature = buildSignature(
        DEFAULT_SMS_CONFIG.username,
        DEFAULT_SMS_CONFIG.password,
        timestamp
    );

    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        "X-Timestamp": timestamp,
        "X-Signature": signature,
    };

    const payload = {
        username: DEFAULT_SMS_CONFIG.username,
        password: DEFAULT_SMS_CONFIG.password,
        mobiles: mobileList,
        content: finalContent,
    };



    try {
        const response: AxiosResponse<SmsApiResponse> = await axios.post(
            DEFAULT_SMS_CONFIG.endpoint,
            payload,
            { headers }
        );

        return response.data;
    } catch (error: any) {
        console.error(
            "Error sending SMS notification:",
            error.response?.data || error.message
        );
        throw error;
    }
}
