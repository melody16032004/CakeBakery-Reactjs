import EditProductController from '../Controller/EditProductController';

const EditProductFactory = (setCategories, setLoading) => {
    return new EditProductController(setCategories, setLoading);
};

export default EditProductFactory;
