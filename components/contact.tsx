import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import emailjs from "@emailjs/browser";
import Section from "./Section";
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField } from "./ui/form";
import { User, Mail, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

interface IFormInput {
    name: string;
    email: string;
    message: string;
}

const ContactForm: React.FC = () => {
    const { t } = useTranslation();
    const methods = useForm<IFormInput>({
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });
    const {
        handleSubmit,
        reset,
        formState: { errors },
    } = methods;
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onSubmit: SubmitHandler<IFormInput> = data => {
        setSuccessMessage(null);
        setErrorMessage(null);
        const templateParams = {
            name: data.name,
            email: data.email,
            message: data.message,
        };

        emailjs
            .send(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, templateParams, {
                publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
            })
            .then(
                () => {
                    setSuccessMessage("Your message has been sent successfully!");
                    reset();
                },
                () => {
                    setErrorMessage(t("contact.form.error"));
                }
            );
    };

    return (
        <Section id="contact" className="bg-slate-50 py-12">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-center mb-6">{t("contact.title")}</h2>
                <span className="block text-center text-gray-600 mb-8">{t("contact.subtitle")}</span>

                <Form {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto p-8 bg-white rounded-lg shadow-lg">
                        {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}
                        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
                        <FormField
                            name="name"
                            control={methods.control}
                            rules={{ required: t("contact.form.name.required") }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("contact.form.name.label")}</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input
                                                {...field}
                                                placeholder={t("contact.form.name.placeholder")}
                                                className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </FormControl>
                                    {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="email"
                            control={methods.control}
                            rules={{ required: t("contact.form.email.required") }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("contact.form.email.label")}</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input
                                                {...field}
                                                placeholder={t("contact.form.email.placeholder")}
                                                className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </FormControl>
                                    {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="message"
                            control={methods.control}
                            rules={{ required: t("contact.form.message.required") }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("contact.form.message.label")}</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <MessageCircle className="absolute left-3 top-O transform translate-y-1/2 text-gray-400" />
                                            <textarea
                                                {...field}
                                                placeholder={t("contact.form.message.placeholder")}
                                                className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </FormControl>
                                    {errors.message && <FormMessage>{errors.message.message}</FormMessage>}
                                </FormItem>
                            )}
                        />
                        <button type="submit" className="w-full mt-5 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                            {t("contact.form.submit")}
                        </button>
                    </form>
                </Form>
            </div>
        </Section>
    );
};

export default ContactForm;
