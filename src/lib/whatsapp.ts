export const WHATSAPP_NUMBER = '918920268840'; // User's Business Number

export const getWhatsAppLink = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

export const getProductInquiryMessage = (productName: string, productId: string) => {
    return `Hello SHEWEDS, I am interested in the ${productName} (ID: ${productId}). Can you please provide more details?`;
};
