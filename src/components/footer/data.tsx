import { ReactNode } from 'react';
import { ReactComponent as InstagramIcon } from '@assets/images/footer/instagram_icon.svg';
import { ReactComponent as TelegramIcon } from '@assets/images/footer/telegram_icon.svg';
import { ReactComponent as YouTubeIcon } from '@assets/images/footer/youtube_icon.svg';
import { ReactComponent as VKIcon } from '@assets/images/footer/vk_icon.svg';
import { ReactComponent as OKIcon } from '@assets/images/footer/ok_icon.svg';

export interface FooterLinks {
  link: string;
  icon: ReactNode;
}

export const footerLinksData: FooterLinks[] = [
  { link: 'https://www.instagram.com/gemline.platform?igsh=MWEyazlxNGJ3eW8wZg==', icon: <InstagramIcon /> },
  { link: 'https://t.me/gemlineplatform', icon: <TelegramIcon /> },
  { link: 'https://youtube.com/@Gemline858?feature=shared', icon: <YouTubeIcon /> },
  { link: 'https://vk.com/club223935534', icon: <VKIcon /> },
  { link: 'https://ok.ru/group/70000004678753', icon: <OKIcon /> },
];
