import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  buyCardFailure,
  buyCardStart,
  buyCardSuccess,
  upgradeCardFailure,
  upgradeCardStart,
  upgradeCardSuccess,
} from "./slice";
import { buy, upgrade, cards } from "./api";
import { xp } from "../xp/api";
export const buyCardAsync = createAsyncThunk(
  "card/app/buy",
  async ({ cardId }: { cardId: number }, { dispatch }) => {
    try {
      dispatch(buyCardStart());
      const { data } = await dispatch(buy.initiate({ cardId }));
      if (data) {
        const { refetch: cardsRefetch } = dispatch(cards.initiate({}));
        const { refetch: xpRefetch } = dispatch(xp.initiate({}));
        await Promise.all([cardsRefetch(), xpRefetch()]);
        dispatch(buyCardSuccess());
      }
    } catch (error: any) {
      dispatch(buyCardFailure(error.message));
    }
  }
);

export const upgradeCardAsync = createAsyncThunk(
  "card/app/upgrade",
  async ({ cardId }: { cardId: number }, { dispatch }) => {
    try {
      dispatch(upgradeCardStart());
      const { data } = await dispatch(upgrade.initiate({ cardId }));
      if (data) {
        const { refetch: cardsRefetch } = dispatch(cards.initiate({}));
        const { refetch: xpRefetch } = dispatch(xp.initiate({}));
        await Promise.all([cardsRefetch(), xpRefetch()]);
        dispatch(upgradeCardSuccess());
      }
    } catch (error: any) {
      dispatch(upgradeCardFailure(error.message));
    }
  }
);
