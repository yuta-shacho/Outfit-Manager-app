import { z } from "zod";

export const transactionSchema = z.object({
  date: z.string().min(1, { message: "日付は必須です" }),
  amount: z.number().min(1, { message: "金額を正しく入力してください" }),
  content: z
    .string()
    .min(1, { message: "内容を入力してください" })
    .max(50, { message: "内容は50文字以内にしてください" }),
  category: z.string().min(1, { message: "カテゴリを選択してください" }),
  genre: z.string().min(1, { message: "ジャンルを選択してください" }),
  color: z.string().min(1, { message: "カラーを選択してください" }),
});

export type Schema = z.infer<typeof transactionSchema>;
