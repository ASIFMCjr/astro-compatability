import { profilesApi } from "shared/api";
import {
  ModelProfile,
  RequestsSaveProfileRequest,
  RequestsUpdateProfileRequest,
} from "shared/api/typed-api/ProfilesApi";
import { createEffect, createEvent, createStore, sample } from "effector";

export const $profile = createStore<ModelProfile>({});

export const getProfileEvent = createEvent<string | undefined>();
export const createProfileEvent = createEvent<RequestsSaveProfileRequest>();
export const updateProfileEvent = createEvent<RequestsUpdateProfileRequest>();

const getProfileFx = createEffect(async (id: string | undefined) => {
  if (id) return (await profilesApi.api.profilesDetail(id)).data;
  else return (await profilesApi.api.profilesMeList()).data;
});

const createProfileFx = createEffect(
  async (data: RequestsSaveProfileRequest) => {
    return (await profilesApi.api.profilesCreate(data)).data;
  }
);

const updateProfileFx = createEffect(
  async (data: RequestsUpdateProfileRequest) => {
    return (await profilesApi.api.profilesUpdate(data)).data;
  }
);

sample({
  clock: getProfileEvent,
  target: getProfileFx,
});

sample({
  clock: getProfileFx.doneData,
  target: $profile,
});

sample({
  clock: createProfileEvent,
  target: createProfileFx,
});

sample({
  clock: updateProfileEvent,
  target: updateProfileFx,
});
