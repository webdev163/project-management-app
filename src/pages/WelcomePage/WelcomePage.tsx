import React, { FC, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '~/hooks/redux';
import { useTranslation } from 'react-i18next';
import { resetIsDeleted } from '~/store/reducers/authSlice';

// import styles from './WelcomePage.module.scss';

const WelcomePage: FC = () => {
  const { isDeleted } = useAppSelector(state => state.auth);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    isDeleted &&
      toast.success(t('EDIT_PROFILE.USER_DELETED'), {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    return () => {
      dispatch(resetIsDeleted());
    };
  }, [dispatch, isDeleted, t]);

  return (
    <div>
      <ToastContainer />
      <h1>Welcome Page</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi necessitatibus eius inventore laborum quod enim
        eum placeat optio libero exercitationem? Dignissimos consectetur laudantium minus tenetur odit velit deserunt
        molestiae repellendus iusto veritatis, animi assumenda. Harum natus, modi rem accusantium ullam beatae dolore et
        consequatur, repellendus quam veritatis saepe sequi voluptatum sed expedita itaque reiciendis eum, laudantium
        non reprehenderit. Delectus provident labore blanditiis rerum, saepe beatae dolore qui praesentium eum
        distinctio laboriosam omnis eius sunt vel nihil impedit tempora alias earum in corrupti rem nam? Amet, adipisci?
        Repudiandae placeat ut cumque veniam. Aperiam voluptatibus enim architecto aut tenetur, harum ratione inventore
        similique omnis doloremque, optio libero minima odit eveniet nostrum. Unde quia facere maxime quos eaque quod
        quaerat perferendis accusantium! Fugiat veniam ad, impedit nihil ipsa provident. Illo, delectus, ipsum minus
        laboriosam id modi, laudantium ad voluptatum maxime cupiditate ea nostrum nam repudiandae. Praesentium vel quae
        autem. Numquam porro nostrum autem, a sequi odit eum aliquam tenetur nihil officiis placeat temporibus
        repellendus? Ullam atque voluptate recusandae eos iure, ab beatae dignissimos quos ut blanditiis ad odit magni
        saepe obcaecati soluta ipsa impedit ratione a, accusantium dolorum. Quod nihil sed dignissimos doloremque
        deserunt tempora esse aspernatur consequuntur sit ipsum dolorum quidem beatae explicabo odit accusantium
        placeat, provident similique, eum officiis. Voluptatum, velit doloribus animi illo iusto officiis, ipsam ipsum
        alias quam amet consequatur commodi libero mollitia ab in temporibus repellendus sequi. Dolor nihil maiores
        provident illo beatae ea autem animi eaque mollitia consequuntur optio sint necessitatibus enim adipisci, iure
        quod, maxime quae blanditiis culpa praesentium sapiente ipsa ullam quia? Expedita ipsa similique eaque fugiat,
        sequi dolorem aspernatur perferendis quae nisi nihil magni? Quibusdam quam quo, iure enim voluptatibus facere
        iusto, odit saepe temporibus earum tempore inventore nisi sed? Id consequatur voluptates officia vel nostrum
        cupiditate ratione ab porro vitae officiis eligendi necessitatibus ducimus error ipsum dolorem quas placeat
        numquam, eaque natus! Sapiente quis culpa exercitationem beatae voluptates ducimus, accusamus illum atque
        mollitia sunt provident, itaque, at rerum deserunt consectetur omnis maxime? Perspiciatis deserunt deleniti,
        nisi qui at rerum, fugiat cumque voluptatem sed impedit nulla architecto nesciunt beatae officiis vel provident,
        corrupti unde distinctio aspernatur? Iure omnis officia perspiciatis dolore reprehenderit! Vitae debitis, natus
        ipsam ad perferendis porro eos atque quas, sint voluptas, soluta harum quo. Quo fugit distinctio neque illum ut?
        Eius modi perspiciatis illo consequatur adipisci eveniet vel cupiditate ex delectus quos repellendus id nam
        quisquam corporis tempore iure aspernatur qui, praesentium perferendis ab debitis. Nostrum vitae eum iusto
        repudiandae veritatis vel temporibus fugit, illo molestias. Tempora mollitia voluptatem error architecto!
        Temporibus optio dolorum adipisci similique tempora debitis amet placeat autem mollitia voluptate modi commodi
        odio architecto quam id quia, nobis, fuga pariatur nemo suscipit facere, soluta non deserunt? Maxime voluptatem
        cumque ducimus, accusantium deserunt ipsum? Suscipit voluptatem vero commodi optio, in ex dolor pariatur
        cupiditate cum neque perferendis. Architecto inventore neque sapiente quidem aut exercitationem hic et vero
        possimus consectetur provident necessitatibus libero labore harum error, beatae nam repellat doloribus veritatis
        aperiam doloremque debitis? Consectetur velit accusantium incidunt ipsum quae!
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi necessitatibus eius inventore laborum quod enim
        eum placeat optio libero exercitationem? Dignissimos consectetur laudantium minus tenetur odit velit deserunt
        molestiae repellendus iusto veritatis, animi assumenda. Harum natus, modi rem accusantium ullam beatae dolore et
        consequatur, repellendus quam veritatis saepe sequi voluptatum sed expedita itaque reiciendis eum, laudantium
        non reprehenderit. Delectus provident labore blanditiis rerum, saepe beatae dolore qui praesentium eum
        distinctio laboriosam omnis eius sunt vel nihil impedit tempora alias earum in corrupti rem nam? Amet, adipisci?
        Repudiandae placeat ut cumque veniam. Aperiam voluptatibus enim architecto aut tenetur, harum ratione inventore
        similique omnis doloremque, optio libero minima odit eveniet nostrum. Unde quia facere maxime quos eaque quod
        quaerat perferendis accusantium! Fugiat veniam ad, impedit nihil ipsa provident. Illo, delectus, ipsum minus
        laboriosam id modi, laudantium ad voluptatum maxime cupiditate ea nostrum nam repudiandae. Praesentium vel quae
        autem. Numquam porro nostrum autem, a sequi odit eum aliquam tenetur nihil officiis placeat temporibus
        repellendus? Ullam atque voluptate recusandae eos iure, ab beatae dignissimos quos ut blanditiis ad odit magni
        saepe obcaecati soluta ipsa impedit ratione a, accusantium dolorum. Quod nihil sed dignissimos doloremque
        deserunt tempora esse aspernatur consequuntur sit ipsum dolorum quidem beatae explicabo odit accusantium
        placeat, provident similique, eum officiis. Voluptatum, velit doloribus animi illo iusto officiis, ipsam ipsum
        alias quam amet consequatur commodi libero mollitia ab in temporibus repellendus sequi. Dolor nihil maiores
        provident illo beatae ea autem animi eaque mollitia consequuntur optio sint necessitatibus enim adipisci, iure
        quod, maxime quae blanditiis culpa praesentium sapiente ipsa ullam quia? Expedita ipsa similique eaque fugiat,
        sequi dolorem aspernatur perferendis quae nisi nihil magni? Quibusdam quam quo, iure enim voluptatibus facere
        iusto, odit saepe temporibus earum tempore inventore nisi sed? Id consequatur voluptates officia vel nostrum
        cupiditate ratione ab porro vitae officiis eligendi necessitatibus ducimus error ipsum dolorem quas placeat
        numquam, eaque natus! Sapiente quis culpa exercitationem beatae voluptates ducimus, accusamus illum atque
        mollitia sunt provident, itaque, at rerum deserunt consectetur omnis maxime? Perspiciatis deserunt deleniti,
        nisi qui at rerum, fugiat cumque voluptatem sed impedit nulla architecto nesciunt beatae officiis vel provident,
        corrupti unde distinctio aspernatur? Iure omnis officia perspiciatis dolore reprehenderit! Vitae debitis, natus
        ipsam ad perferendis porro eos atque quas, sint voluptas, soluta harum quo. Quo fugit distinctio neque illum ut?
        Eius modi perspiciatis illo consequatur adipisci eveniet vel cupiditate ex delectus quos repellendus id nam
        quisquam corporis tempore iure aspernatur qui, praesentium perferendis ab debitis. Nostrum vitae eum iusto
        repudiandae veritatis vel temporibus fugit, illo molestias. Tempora mollitia voluptatem error architecto!
        Temporibus optio dolorum adipisci similique tempora debitis amet placeat autem mollitia voluptate modi commodi
        odio architecto quam id quia, nobis, fuga pariatur nemo suscipit facere, soluta non deserunt? Maxime voluptatem
        cumque ducimus, accusantium deserunt ipsum? Suscipit voluptatem vero commodi optio, in ex dolor pariatur
        cupiditate cum neque perferendis. Architecto inventore neque sapiente quidem aut exercitationem hic et vero
        possimus consectetur provident necessitatibus libero labore harum error, beatae nam repellat doloribus veritatis
        aperiam doloremque debitis? Consectetur velit accusantium incidunt ipsum quae!
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi necessitatibus eius inventore laborum quod enim
        eum placeat optio libero exercitationem? Dignissimos consectetur laudantium minus tenetur odit velit deserunt
        molestiae repellendus iusto veritatis, animi assumenda. Harum natus, modi rem accusantium ullam beatae dolore et
        consequatur, repellendus quam veritatis saepe sequi voluptatum sed expedita itaque reiciendis eum, laudantium
        non reprehenderit. Delectus provident labore blanditiis rerum, saepe beatae dolore qui praesentium eum
        distinctio laboriosam omnis eius sunt vel nihil impedit tempora alias earum in corrupti rem nam? Amet, adipisci?
        Repudiandae placeat ut cumque veniam. Aperiam voluptatibus enim architecto aut tenetur, harum ratione inventore
        similique omnis doloremque, optio libero minima odit eveniet nostrum. Unde quia facere maxime quos eaque quod
        quaerat perferendis accusantium! Fugiat veniam ad, impedit nihil ipsa provident. Illo, delectus, ipsum minus
        laboriosam id modi, laudantium ad voluptatum maxime cupiditate ea nostrum nam repudiandae. Praesentium vel quae
        autem. Numquam porro nostrum autem, a sequi odit eum aliquam tenetur nihil officiis placeat temporibus
        repellendus? Ullam atque voluptate recusandae eos iure, ab beatae dignissimos quos ut blanditiis ad odit magni
        saepe obcaecati soluta ipsa impedit ratione a, accusantium dolorum. Quod nihil sed dignissimos doloremque
        deserunt tempora esse aspernatur consequuntur sit ipsum dolorum quidem beatae explicabo odit accusantium
        placeat, provident similique, eum officiis. Voluptatum, velit doloribus animi illo iusto officiis, ipsam ipsum
        alias quam amet consequatur commodi libero mollitia ab in temporibus repellendus sequi. Dolor nihil maiores
        provident illo beatae ea autem animi eaque mollitia consequuntur optio sint necessitatibus enim adipisci, iure
        quod, maxime quae blanditiis culpa praesentium sapiente ipsa ullam quia? Expedita ipsa similique eaque fugiat,
        sequi dolorem aspernatur perferendis quae nisi nihil magni? Quibusdam quam quo, iure enim voluptatibus facere
        iusto, odit saepe temporibus earum tempore inventore nisi sed? Id consequatur voluptates officia vel nostrum
        cupiditate ratione ab porro vitae officiis eligendi necessitatibus ducimus error ipsum dolorem quas placeat
        numquam, eaque natus! Sapiente quis culpa exercitationem beatae voluptates ducimus, accusamus illum atque
        mollitia sunt provident, itaque, at rerum deserunt consectetur omnis maxime? Perspiciatis deserunt deleniti,
        nisi qui at rerum, fugiat cumque voluptatem sed impedit nulla architecto nesciunt beatae officiis vel provident,
        corrupti unde distinctio aspernatur? Iure omnis officia perspiciatis dolore reprehenderit! Vitae debitis, natus
        ipsam ad perferendis porro eos atque quas, sint voluptas, soluta harum quo. Quo fugit distinctio neque illum ut?
        Eius modi perspiciatis illo consequatur adipisci eveniet vel cupiditate ex delectus quos repellendus id nam
        quisquam corporis tempore iure aspernatur qui, praesentium perferendis ab debitis. Nostrum vitae eum iusto
        repudiandae veritatis vel temporibus fugit, illo molestias. Tempora mollitia voluptatem error architecto!
        Temporibus optio dolorum adipisci similique tempora debitis amet placeat autem mollitia voluptate modi commodi
        odio architecto quam id quia, nobis, fuga pariatur nemo suscipit facere, soluta non deserunt? Maxime voluptatem
        cumque ducimus, accusantium deserunt ipsum? Suscipit voluptatem vero commodi optio, in ex dolor pariatur
        cupiditate cum neque perferendis. Architecto inventore neque sapiente quidem aut exercitationem hic et vero
        possimus consectetur provident necessitatibus libero labore harum error, beatae nam repellat doloribus veritatis
        aperiam doloremque debitis? Consectetur velit accusantium incidunt ipsum quae!
      </p>
      <div style={{ height: '200vh' }}></div>
    </div>
  );
};

export default WelcomePage;
