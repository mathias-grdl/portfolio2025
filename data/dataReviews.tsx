import { TFunction } from 'i18next';

interface ReviewType {
    id: number;
    picture: string;
    name: string;
    flag: string;
    country: string;
    stars: number;
}

interface ReviewWithTranslation extends ReviewType {
    review: string;
}

export const reviewsData: ReviewType[] = [
    {
        id: 1,
        name: "djamelfilm",
        country: "France",
        flag: "https://flagcdn.com/fr.svg",
        stars: 5,
        picture: "https://apps.gosite.com/hubfs/Vector-2.png",
    },
    {
        id: 2,
        name: "djamelfilm",
        country: "France",
        flag: "https://flagcdn.com/fr.svg",
        stars: 5,
        picture: "https://apps.gosite.com/hubfs/Vector-2.png",
    },
    {
        id: 3,
        name: "letendre9",
        country: "Canada",
        flag: "https://flagcdn.com/ca.svg",
        stars: 5,
        picture:
            "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/5492a747b8a32de45a076385029f1fc6-1711621631192/50e12f7a-ca8d-4b33-87fc-28d46a6fe740.png",
    },
    {
        id: 4,
        name: "souly_sam",
        country: "Ivory Coast",
        flag: "https://flagcdn.com/ci.svg",
        stars: 5,
        picture: "https://apps.gosite.com/hubfs/Vector-2.png",
    },
    {
        id: 5,
        name: "alexisalexis442",
        country: "France",
        flag: "https://flagcdn.com/fr.svg",
        stars: 5,
        picture:
            "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/b4029b70f4f3080245dd875eeb180a0d-1709970852324/148f5242-735d-430e-b700-f51771bd86ac.png",
    },
    {
        id: 6,
        name: "mtlp_frag",
        country: "France",
        flag: "https://flagcdn.com/fr.svg",
        stars: 5,
        picture: "https://apps.gosite.com/hubfs/Vector-2.png",
    },
    {
        id: 7,
        name: "mtlp_frag",
        country: "France",
        flag: "https://flagcdn.com/fr.svg",
        stars: 5,
        picture: "https://apps.gosite.com/hubfs/Vector-2.png",
    },
    {
        id: 8,
        name: "alexisalexis442",
        country: "France",
        flag: "https://flagcdn.com/fr.svg",
        stars: 5,
        picture:
            "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/b4029b70f4f3080245dd875eeb180a0d-1709970852324/148f5242-735d-430e-b700-f51771bd86ac.png",
    },
    {
        id: 9,
        name: "inos_architects",
        country: "Switzerland",
        flag: "https://flagcdn.com/ch.svg",
        stars: 5,
        picture: "https://apps.gosite.com/hubfs/Vector-2.png",
    },
    {
        id: 10,
        name: "mtlp_frag",
        country: "France",
        flag: "https://flagcdn.com/fr.svg",
        stars: 5,
        picture: "https://apps.gosite.com/hubfs/Vector-2.png",
    },
    {
        id: 11,
        name: "octavewagner",
        country: "France",
        flag: "https://flagcdn.com/fr.svg",
        stars: 4,
        picture: "https://apps.gosite.com/hubfs/Vector-2.png",
    },
    {
        id: 13,
        name: "lbeplm",
        country: "France",
        flag: "https://flagcdn.com/fr.svg",
        stars: 5,
        picture: "https://apps.gosite.com/hubfs/Vector-2.png",
    },
    {
        id: 14,
        name: "lonnylonn",
        country: "France",
        flag: "https://flagcdn.com/fr.svg",
        stars: 5,
        picture:
            "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/6578aead4d393f9c659f96a3efcb08f3-1700499158847/29c654e3-3512-4b73-b2d0-e0a1603c71c2.jpg",
    },
    {
        id: 15,
        name: "feloagency",
        country: "France",
        flag: "https://flagcdn.com/fr.svg",
        stars: 5,
        picture:
            "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/d155a66cca803a196845239e57240d44-1706625746882/a59ef733-d1dc-4fb3-8bef-6b21565e34fe.jpg",
    },
    {
        id: 16,
        name: "alisonhgas",
        country: "France",
        flag: "https://flagcdn.com/fr.svg",
        stars: 5,
        picture: "https://apps.gosite.com/hubfs/Vector-2.png",
    },
    {
        id: 17,
        name: "charlo1013",
        country: "France",
        flag: "https://flagcdn.com/fr.svg",
        stars: 4.7,
        picture: "https://apps.gosite.com/hubfs/Vector-2.png",
    },
    {
        id: 18,
        name: "clemence_wordpr",
        country: "France",
        flag: "https://flagcdn.com/fr.svg",
        stars: 5,
        picture: "https://apps.gosite.com/hubfs/Vector-2.png",
    },
    {
        id: 19,
        name: "phileasfogg06",
        country: "France",
        flag: "https://flagcdn.com/fr.svg",
        stars: 5,
        picture: "https://apps.gosite.com/hubfs/Vector-2.png",
    },
    {
        id: 20,
        name: "coralieh31",
        country: "France",
        flag: "https://flagcdn.com/fr.svg",
        stars: 4.7,
        picture: "https://apps.gosite.com/hubfs/Vector-2.png",
    },
    {
        id: 21,
        name: "maximesiepiora",
        country: "France",
        flag: "https://flagcdn.com/fr.svg",
        stars: 5,
        picture:
            "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/4ca9ef9f7d263e14fe2857cb98265594-1696944929648/808e56f7-ea7c-4378-8eea-d40f93b3d622.JPG",
    },
    {
        id: 22,
        name: "topitambour",
        country: "France",
        flag: "https://flagcdn.com/fr.svg",
        stars: 5,
        picture: "https://apps.gosite.com/hubfs/Vector-2.png",
    },
    {
        id: 23,
        name: "mtlp_frag",
        country: "France",
        flag: "https://flagcdn.com/fr.svg",
        stars: 5,
        picture: "https://apps.gosite.com/hubfs/Vector-2.png",
    },
    {
        id: 24,
        name: "massay1008",
        country: "France",
        flag: "https://flagcdn.com/fr.svg",
        stars: 5,
        picture: "https://apps.gosite.com/hubfs/Vector-2.png",
    },
    {
        id: 25,
        name: "lonnylonn",
        country: "France",
        flag: "https://flagcdn.com/fr.svg",
        stars: 5,
        picture:
            "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/6578aead4d393f9c659f96a3efcb08f3-1700499158847/29c654e3-3512-4b73-b2d0-e0a1603c71c2.jpg",
    },
    {
        id: 26,
        name: "lbeplm",
        country: "France",
        flag: "https://flagcdn.com/fr.svg",
        stars: 5,
        picture: "https://apps.gosite.com/hubfs/Vector-2.png",
    },
    {
        id: 27,
        name: "lbeplm",
        country: "France",
        flag: "https://flagcdn.com/fr.svg",
        stars: 5,
        picture: "https://apps.gosite.com/hubfs/Vector-2.png",
    },
];

export const getReviews = (t: TFunction): ReviewWithTranslation[] => {
    return reviewsData.map(review => ({
        ...review,
        review: t(`reviews.items.${review.id}`),
    }));
};
