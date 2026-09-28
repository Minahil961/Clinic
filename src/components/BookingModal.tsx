import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { BookingForm } from './BookingForm';
import { Logo } from './Logo';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDepartmentId?: string;
  initialDoctorId?: string;
  initialServiceId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialDepartmentId,
  initialDoctorId,
  initialServiceId,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="flex min-h-full items-center justify-center p-3 sm:p-4 text-center">
        <div
          className="relative w-full max-w-2xl transform overflow-hidden rounded-3xl bg-[#FBF9F3] text-left shadow-2xl transition-all border border-[#44562A]/20 my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="bg-[#44562A] px-6 py-4 flex items-center justify-between text-[#F5F0E1]">
            <div className="flex items-center gap-3">
              <Logo variant="cream" size="sm" />
              <div className="hidden sm:block border-l border-[#6B7F4A] pl-3">
                <p className="text-[11px] uppercase tracking-wider text-[#C9B98A] font-semibold">Priority Booking</p>
                <p className="text-xs text-[#F5F0E1]/80">Lake City Flagship Clinic</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#F5F0E1]/80 hover:text-white hover:bg-[#34431F] rounded-full transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
            <BookingForm
              isModal={true}
              initialDepartmentId={initialDepartmentId}
              initialDoctorId={initialDoctorId}
              initialServiceId={initialServiceId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
