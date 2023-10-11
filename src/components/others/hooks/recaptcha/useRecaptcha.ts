import { load } from "recaptcha-v3";
import { useRecaptchaMutation } from "../../../../store/features/new-user/new-user-slice";

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as unknown as string;

const useReCaptcha = () => {
  const [recaptcha] = useRecaptchaMutation();

  return async (action: string) => {
    const generateToken = await load(siteKey, {
      autoHideBadge: true,
    });
    const token = await generateToken.execute(action);
    await recaptcha({ token }).unwrap();
  };
};

export default useReCaptcha;
