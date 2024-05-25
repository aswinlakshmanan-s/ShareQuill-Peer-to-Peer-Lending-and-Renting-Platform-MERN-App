import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_puxnm31', 'template_wivpttc', form.current, 'PaLytLdVtKk6Nzy8J')
      .then((result) => {
          console.log(result.text);
          console.log("message sent");
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    // <form ref={form} onSubmit={sendEmail}>
    //   <label>Name</label>
    //   <input type="text" name="user_name" />
    //   <label>Email</label>
    //   <input type="email" name="user_email" />
    //   <label>Message</label>
    //   <textarea name="message" />
    //   <input type="submit" value="Send" />
    // </form>

<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form ref={form} onSubmit={sendEmail} className="space-y-6" action="#">
      <div>
        <label for="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
        <div className="mt-2">
          <input id="username" name="user_name" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <label for="name" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
        <div className="mt-2">
          <input id="email" name="user_email" type="email" autocomplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <label for="name" className="block text-sm font-medium leading-6 text-gray-900">Message</label>
        <div className="mt-2">
          <textarea id="email" name="message" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <input type="submit" value="Send" className="flex w-full justify-center rounded-md bg-black-1000 px-3 py-1.5 text-sm font-semibold leading-6 text-black-50 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"/>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      Or
      <ul>
                <li><a href="tel:123-456-7890">Contact us:  +1 123-456-7890</a></li> 
                <li><a href="mailto:example@gmail.com">Email:  example@gmail.com</a></li> 
    </ul>   
    </p>
  </div>
</div>
  );
};