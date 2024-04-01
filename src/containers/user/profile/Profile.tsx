import { ProfileForm } from './components/profileForm/ProfileForm';
import { ProfileFormHeader } from './components/profileFormHeader/ProfileFormHeader';
import { ProfileInfo } from './components/profileInfo/ProfileInfo';

import { useUpdateName, useUpdatePassword } from '@api/index';

import { Buttons, Footer } from '@components/index';
import { ContentWrapper, Heading, Wrapper } from '@containers/common/styles';
import styled from '@emotion/styled';
import { ButtonsTypes } from '@enums/index';
import { logOut } from '@features/index';
import { colorFetch, media } from '@styles/index';
import { useQueryClient } from '@tanstack/react-query';
import { sha256 } from 'js-sha256';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGlobalState } from 'src/globalContext';

import { ReactComponent as LogOutIcon } from '@assets/images/sidebar/profile/log_out.svg';

const ProfileWraperForm = styled.form`
  width: 100%;
  border-radius: 24px;
  background: ${colorFetch('white')};
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;

  ${media.phone} {
    gap: 24px;
    padding: 20px;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  max-width: 430px;
  justify-content: space-between;

  &.not_visible {
    min-width: 0;
    width: 0;
    min-height: 0;
    height: 0;
    border: 0;
    margin: 0;
    padding: 0;
    visibility: hidden;
    display: none;
  }

  ${media.phone} {
    flex-direction: column;
  }
`;

const ButtonsInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &.not_visible {
    min-width: 0;
    width: 0;
    min-height: 0;
    height: 0;
    border: 0;
    margin: 0;
    padding: 0;
    visibility: hidden;
  }

  ${media.phone} {
    flex-direction: column;
    gap: 10px;
  }
`;

const StyledButtons = styled(Buttons)`
  width: max-content;
  height: 100%;

  // required for form
  &.save_changes {
    min-width: max-content;
    flex: 2;
    margin-right: 12px;
  }

  // required for form
  &.not_visible {
    min-width: 0;
    width: 0;
    min-height: 0;
    height: 0;
    border: 0;
    margin: 0;
    padding: 0;
    visibility: hidden;
    display: none;
  }

  &.cancel {
    flex: 1;
  }

  > p {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  ${media.phone} {
    width: 100%;

    &.save_changes {
      margin-right: 0;
      margin-bottom: 12px;
    }
  }
`;

const StyledLogOutIcon = styled(LogOutIcon)`
  cursor: pointer;
  width: 18px;
  height: 18px;

  & g path {
    transition: all 0.2s linear;
    stroke: ${colorFetch('red1')};
  }

  &:hover {
    & g path {
      stroke: ${colorFetch('red1')};
    }
  }
`;

export interface IFormInput {
  name: string;
  email: string;
  password: string;
  repeat_password: string;
}

interface ProfileProps {}

export const Profile: FC<ProfileProps> = () => {
  const { userName, userEmail } = useGlobalState();
  const queryClient = useQueryClient();

  const [isEditingForm, setIsEditingForm] = useState<boolean>(false);

  const [defaultValues, setDefaultValues] = useState<IFormInput>({
    name: '',
    email: '',
    password: '',
    repeat_password: '',
  });

  const { handleSubmit, register, reset, formState, watch, setError, trigger } = useForm<IFormInput>({
    mode: 'all',
    defaultValues: defaultValues,
  });

  const { errors } = formState;

  useEffect(() => {
    setDefaultValues((prev) => ({ ...prev, name: userName, email: userEmail }));

    reset({ ...defaultValues, name: userName, email: userEmail });
  }, [userName, userEmail]);

  const updateNameSuccess = ({ data }: any) => {
    queryClient.invalidateQueries({ queryKey: ['name'] });
  };

  const updateNameError = ({ response }: any) => {
    setError('name', {
      type: 'manual',
      message: 'Что пошло не так, попробуйте снова',
    });
  };

  const updateName = useUpdateName({
    onSuccess: updateNameSuccess,
    onError: updateNameError,
  });

  const updatePasswordSuccess = ({ data }: any) => {
    queryClient.invalidateQueries({ queryKey: ['name'] });
  };

  const updatePasswordError = ({ response }: any) => {
    setError('repeat_password', {
      type: 'manual',
      message: 'Что пошло не так, попробуйте снова',
    });
  };

  const updatePassword = useUpdatePassword({
    onSuccess: updatePasswordSuccess,
    onError: updatePasswordError,
  });

  const onSubmit = (data: IFormInput) => {
    if (userName !== data.name) {
      updateName({
        Name: data.name,
      });
    }

    if (data.password) {
      const encryptedPassword = sha256(data.password);

      updatePassword({
        Password: encryptedPassword,
      });
    }

    reset({ ...defaultValues, password: '', repeat_password: '' });
    setIsEditingForm(false);
  };

  const handleLogOut = (e: any) => {
    e.stopPropagation();
    logOut();
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <Heading>Профиль</Heading>
        <ProfileWraperForm onSubmit={handleSubmit(onSubmit)}>
          <ProfileFormHeader name={userName} isEditingForm={isEditingForm} />
          {isEditingForm ? (
            <ProfileForm register={register} errors={errors} watch={watch} trigger={trigger} />
          ) : (
            <ProfileInfo defaultValues={defaultValues} />
          )}

          <ButtonsWrapper className={!isEditingForm && 'not_visible'}>
            {/* не может быть удалено из DOM изза неадекватного поведения формы */}
            <StyledButtons
              className={`${!isEditingForm && 'not_visible'} save_changes`}
              type="submit"
              buttonType={ButtonsTypes.CONTAINED_GREEN}
            >
              Сохранить изменения
            </StyledButtons>
            <StyledButtons
              className={`${!isEditingForm && 'not_visible'} cancel`}
              buttonType={ButtonsTypes.CONTAINED_GRAY}
              onClick={() => setIsEditingForm(() => false)}
            >
              Отмена
            </StyledButtons>
          </ButtonsWrapper>
          <ButtonsInfoWrapper className={isEditingForm && 'not_visible'}>
            <StyledButtons
              className={isEditingForm && 'not_visible'}
              buttonType={ButtonsTypes.CONTAINED_GREEN}
              onClick={() => setIsEditingForm(() => true)}
            >
              Редактировать
            </StyledButtons>

            <StyledButtons
              className={isEditingForm && 'not_visible'}
              buttonType={ButtonsTypes.CONTAINED_LIGHT_RED}
              onClick={handleLogOut}
            >
              <p>
                Выйти <StyledLogOutIcon />
              </p>
            </StyledButtons>
          </ButtonsInfoWrapper>
        </ProfileWraperForm>
      </ContentWrapper>
      <Footer />
    </Wrapper>
  );
};
