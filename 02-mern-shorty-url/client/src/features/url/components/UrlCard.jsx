import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useState } from 'react';
import {
  BiLinkExternal, FiTrash2,
  GoClippy,
  HiCursorClick,
  IoQrCodeSharp,
  MdOutlineShare,
  TbHandClick,
} from 'react-icons/all.js';
import {
  EmailIcon,
  EmailShareButton,
  TelegramIcon,
  TelegramShareButton,
  VKIcon,
  VKShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import { Link } from 'react-router-dom';
/* =============================
📦 Custom Imports
============================= */
import { resetTemporaryState } from '@features/temporary/temporarySlice.js';
import { resetUrlState } from '@features/url/urlSlice.js';
import { API_TEMPORARY, API_URL } from '@api/api.js';
/* =============================
📦 Component - UrlCard
============================= */
export default function UrlCard({ item, home }) {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const dispatch = useDispatch();
  const [openShare, setOpenShare] = useState(false);
  /* =============================
  📦 Section - Methods:
  ============================= */
  // Generate QR Code
  const onQrCode = async () => {
    const image = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=200x$200&data=${item.shortenUrl}`);
    const imageBlob = await image.blob();
    const imageURL = URL.createObjectURL(imageBlob);
    const link = document.createElement('a');
    link.href = imageURL;
    link.download = 'qr-code';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('QR Code generated');
  };

  // Copy to Clipboard
  const onCopy = () => {
    navigator.clipboard.writeText(item.shortenUrl).then(
      () => toast.success('Copied to clipboard'),
      () => toast.error('Failed when copy to clipboard'),
    );
  };

  // Toggle Share
  const onShare = () => {
    setOpenShare(prev => !prev);
  };

  // Delete Url
  const onDelete = () => {
    dispatch(home ? API_TEMPORARY.DELETE(item._id) : API_URL.DELETE(item._id))
      .then(() => {
        dispatch(home ? resetTemporaryState() : resetUrlState());
        toast.success('URL successfully deleted');
      });
  };

  /* =============================
  📦 Section - Rendering:
  ============================= */
  return <div className='grid gap-2 sm:grid-cols-[1fr_auto]'>

    <div className='grid gap-2'>
      <input className='input h-[40px]' type='text' readOnly={true} disabled={true} value={item.shortenUrl} />
      {/* Original URL*/}
      <p className='flex gap-1 items-center'>
        <BiLinkExternal className='shrink-0' />
        <a href={item.originalUrl} target='_blank'
           className='text-[12px] font-bold transition-all hover:text-indigo-500 break-all'>
          {item.originalUrl.length > 100 ? `${item.originalUrl.substring(0, 100)}...` : item.originalUrl}
        </a>
      </p>
    </div>

    {/* Buttons */}
    <div className='flex flex-wrap gap-2 justify-end'>
      {/* Open in another Tab*/}
      {!home && (
        <p className='btn btn-primary h-[40px] p-1 px-2'>
          <TbHandClick size={18} />
          <span>{item.clicks}</span>
        </p>
      )}
      {/* Open in another Tab*/}
      <Link to={item.shortenUrl} target='_blank' className='btn w-[40px] h-[40px] p-1'>
        <HiCursorClick size={18} />
      </Link>
      {/* Copy to Clipboard */}
      <button className='btn w-[40px] h-[40px] p-1' onClick={onCopy}>
        <GoClippy size={18} />
      </button>
      {/* Generate QR Code */}
      <button className='btn w-[40px] h-[40px] p-1' onClick={onQrCode}>
        <IoQrCodeSharp size={18} />
      </button>
      {/* Share */}
      <div className='relative'>
        <button className='btn w-[40px] h-[40px] p-1' onClick={onShare}>
          <MdOutlineShare size={18} />
        </button>
        {/* Share buttons */}
        {openShare && (
          <div className='flex gap-1 p-2 border-2 absolute bottom-11 right-0 bg-white z-[5] sm:-bottom-8'>
            <TelegramShareButton url={item.shortenUrl}>
              <TelegramIcon size={32} />
            </TelegramShareButton>
            <WhatsappShareButton url={item.shortenUrl}>
              <WhatsappIcon size={32} />
            </WhatsappShareButton>
            <VKShareButton url={item.shortenUrl}>
              <VKIcon size={32} />
            </VKShareButton>
            <EmailShareButton url={item.shortenUrl}>
              <EmailIcon size={32} />
            </EmailShareButton>
          </div>
        )}
      </div>
      {/* Delete */}
      <button className='btn w-[40px] h-[40px] p-1 text-red-500' onClick={onDelete}>
        <FiTrash2 size={18} />
      </button>
    </div>
  </div>;
}
