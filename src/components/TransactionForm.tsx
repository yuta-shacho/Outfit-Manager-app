import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  ListItemIcon,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close"; // 閉じるボタン用のアイコン
import { FaTshirt } from "react-icons/fa";
import { GiMonclerJacket } from "react-icons/gi";
import { PiPantsFill } from "react-icons/pi";
import { GiSkirt } from "react-icons/gi";
import { GiAmpleDress } from "react-icons/gi";
import { BsHandbagFill } from "react-icons/bs";
import { GiConverseShoe } from "react-icons/gi";
import { GiHeartNecklace } from "react-icons/gi";
import { SiTeepublic } from "react-icons/si";
import { GiForestCamp } from "react-icons/gi";
import { GiSkateboard } from "react-icons/gi";
import { VscColorMode } from "react-icons/vsc";
import { FaPersonMilitaryRifle } from "react-icons/fa6";
import { PiAirplaneTiltFill } from "react-icons/pi";
import { PiShirtFoldedFill } from "react-icons/pi";
import {
  red,
  pink,
  purple,
  blue,
  green,
  yellow,
  orange,
  brown,
  grey,
} from "@mui/material/colors";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Transaction,
  TransactionCategory,
  TransactionColor,
  TransactionGenre,
} from "../types";
import { Schema, transactionSchema } from "../validations/schema";
import { useAppContext } from "../context/AppContext";

interface TransactionFormProps {
  onCloseForm: () => void;
  isEntryDrawerOpen: boolean;
  currentDay: string;

  selectedTransaction: Transaction | null;

  setSelectedTransaction: React.Dispatch<
    React.SetStateAction<Transaction | null>
  >;

  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CategoryItem {
  label: TransactionCategory;
  icon: JSX.Element;
}

interface GenreItem {
  label: TransactionGenre;
  icon: JSX.Element;
}

interface ColorItem {
  label: TransactionColor;
  color: string;
}

const TransactionForm = ({
  onCloseForm,
  isEntryDrawerOpen,
  currentDay,

  setSelectedTransaction,

  selectedTransaction,

  isDialogOpen,
  setIsDialogOpen,
}: TransactionFormProps) => {
  const {
    isMobile,
    onDeleteTransaction,
    onSaveTransaction,
    handleUpdateTransaction,
  } = useAppContext();

  const formWidth = 320;

  const expenseCategories: CategoryItem[] = [
    { label: "トップス", icon: <FaTshirt /> },
    { label: "ジャケット・アウター", icon: <GiMonclerJacket /> },
    { label: "パンツ", icon: <PiPantsFill /> },
    { label: "スカート", icon: <GiSkirt /> },
    { label: "ワンピース", icon: <GiAmpleDress /> },
    { label: "バッグ", icon: <BsHandbagFill /> },
    { label: "靴", icon: <GiConverseShoe /> },
    { label: "アクセサリー", icon: <GiHeartNecklace /> },
  ];

  const expenseGenres: GenreItem[] = [
    { label: "カジュアル", icon: <SiTeepublic /> },
    { label: "きれいめ", icon: <PiShirtFoldedFill /> },
    { label: "ストリート", icon: <GiSkateboard /> },
    { label: "アウトドア・テック", icon: <GiForestCamp /> },
    { label: "モード", icon: <VscColorMode /> },
    { label: "ミリタリー", icon: <FaPersonMilitaryRifle /> },
    { label: "韓国", icon: <PiAirplaneTiltFill /> },
  ];

  const expenseColors: ColorItem[] = [
    { label: "ブラック系", color: "" },
    { label: "ホワイト系", color: "" },
    { label: "グレイ系", color: grey[600] },
    { label: "ブラウン系", color: brown[500] },
    { label: "レッド系", color: red[500] },
    { label: "ピンク系", color: pink[500] },
    { label: "パープル系", color: purple[500] },
    { label: "ブルー系", color: blue[500] },
    { label: "グリーン系", color: green[500] },
    { label: "イエロー系", color: yellow[500] },
    { label: "オレンジ系", color: orange[500] },
  ];

  const {
    control,
    setValue,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Schema>({
    defaultValues: {
      date: currentDay,
      amount: 0,
      category: "",
      genre: "",
      color: "",
      content: "",
    },
    resolver: zodResolver(transactionSchema),
  });

  const [categories, setCategories] = useState(expenseCategories);
  const [genres, setGenres] = useState(expenseGenres);
  const [colors, setColors] = useState(expenseColors);

  useEffect(() => {
    setValue("date", currentDay);
  }, [currentDay]);

  const onSubmit: SubmitHandler<Schema> = (data) => {
    if (selectedTransaction) {
      handleUpdateTransaction(data, selectedTransaction.id)
        .then(() => {
          setSelectedTransaction(null);
          if (isMobile) {
            setIsDialogOpen(false);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      onSaveTransaction(data)
        .then(() => {
          console.log("変更しました");
        })
        .catch((err) => {
          console.error(err);
        });
    }

    reset({
      date: currentDay,
      amount: 0,
      category: "",
      genre: "",
      color: "",
      content: "",
    });
  };

  useEffect(() => {
    if (selectedTransaction) {
      setValue("date", selectedTransaction.date);
      setValue("amount", selectedTransaction.amount);
      setValue("category", selectedTransaction.category);
      setValue("genre", selectedTransaction.genre);
      setValue("color", selectedTransaction.color);
      setValue("content", selectedTransaction.content);
    } else {
      reset({
        date: currentDay,
        amount: 0,
        category: "",
        genre: "",
        color: "",
        content: "",
      });
    }
  }, [selectedTransaction]);

  const handleDelete = () => {
    if (selectedTransaction) {
      onDeleteTransaction(selectedTransaction.id);
      setSelectedTransaction(null);
      if (isMobile) {
        setIsDialogOpen(false);
      }
    }
  };

  const formContent = (
    <>
      {/* 入力エリアヘッダー */}
      <Box display={"flex"} justifyContent={"space-between"} mb={2}>
        <Typography variant="h6">入力</Typography>
        {/* 閉じるボタン */}
        <IconButton
          onClick={onCloseForm}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      {/* フォーム要素 */}
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {/* 日付 */}
          <Controller
            name="date"
            control={control}
            render={({ field }) => {
              console.log(field.value);
              return (
                <TextField
                  {...field}
                  label="日付"
                  type="date"
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  error={!!errors.date}
                  helperText={errors.date?.message}
                />
              );
            }}
          />
          {/* カテゴリ */}
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.category}>
                <InputLabel id="category-select-label">カテゴリ</InputLabel>
                <Select
                  {...field}
                  labelId="category-select-label"
                  id="category-select"
                  label="カテゴリ"
                >
                  {categories.map((category, index) => (
                    <MenuItem value={category.label} key={index}>
                      <ListItemIcon>{category.icon}</ListItemIcon>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.category?.message}</FormHelperText>
              </FormControl>
            )}
          />
          {/* ジャンル */}
          <Controller
            name="genre"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.genre}>
                <InputLabel id="genre-select-label">ジャンル</InputLabel>
                <Select
                  {...field}
                  labelId="genre-select-label"
                  id="genre-select"
                  label="ジャンル"
                >
                  {genres.map((genre, index) => (
                    <MenuItem value={genre.label} key={index}>
                      <ListItemIcon>{genre.icon}</ListItemIcon>
                      {genre.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.genre?.message}</FormHelperText>
              </FormControl>
            )}
          />
          {/* カラー */}
          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              // <TextField
              //   error={!!errors.color}
              //   helperText={errors.color?.message}
              //   {...field}
              //   id="カラー"
              //   label="カラー"
              //   select
              // >
              //   {colors.map((color, index) => (
              //     <MenuItem
              //       value={color.label}
              //       sx={{ fontWeight: "600", color: color.color }}
              //       key={index}
              //     >
              //       {color.label}
              //     </MenuItem>
              //   ))}
              // </TextField>
              <FormControl fullWidth error={!!errors.color}>
                <InputLabel id="color-select-label">カラー</InputLabel>
                <Select
                  {...field}
                  labelId="color-select-label"
                  id="color-select"
                  label="カラー"
                >
                  {colors.map((color, index) => (
                    <MenuItem
                      value={color.label}
                      sx={{ fontWeight: "600", color: color.color }}
                      key={index}
                    >
                      {color.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.color?.message}</FormHelperText>
              </FormControl>
            )}
          />

          {/* 金額 */}
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.amount}
                helperText={errors.amount?.message}
                {...field}
                value={field.value === 0 ? "" : field.value}
                onChange={(e) => {
                  const newValue = parseInt(e.target.value, 10) || 0;
                  field.onChange(newValue);
                }}
                label="金額"
                type="number"
              />
            )}
          />

          {/* 内容 */}
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.content}
                helperText={errors.content?.message}
                {...field}
                label="内容"
                type="text"
              />
            )}
          />

          {/* 保存ボタン */}
          <Button type="submit" variant="contained" color={"primary"} fullWidth>
            {selectedTransaction ? "変更" : "保存"}
          </Button>
          {/* 削除ボタン */}
          {selectedTransaction && (
            <Button
              onClick={handleDelete}
              variant="outlined"
              color={"error"}
              fullWidth
            >
              削除
            </Button>
          )}
        </Stack>
      </Box>
    </>
  );

  return (
    <>
      {isMobile ? (
        //モバイル
        <Dialog
          open={isDialogOpen}
          onClose={onCloseForm}
          fullWidth
          maxWidth={"sm"}
        >
          <DialogContent>{formContent}</DialogContent>
        </Dialog>
      ) : (
        //PC
        <Box
          sx={{
            position: "fixed",
            top: 64,
            right: isEntryDrawerOpen ? formWidth : "-2%", // フォームの位置を調整
            width: formWidth,
            height: "100%",
            bgcolor: "background.paper",
            zIndex: (theme) => theme.zIndex.drawer - 1,
            transition: (theme) =>
              theme.transitions.create("right", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            p: 2, // 内部の余白
            boxSizing: "border-box", // ボーダーとパディングをwidthに含める
            boxShadow: "0px 0px 15px -5px #777777",
          }}
        >
          {formContent}
        </Box>
      )}
    </>
  );
};
export default TransactionForm;
