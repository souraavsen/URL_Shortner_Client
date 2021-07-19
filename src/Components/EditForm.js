import React from 'react'
import axios from "axios";

import SaveIcon from "@material-ui/icons/Save";

const [editData, setEditData] = useState("");

export const EditForm = () => {
    return (
      <div>
        <form
          onSubmit={(e) => {
            handleEdit(e, item.id);
          }}
        >
          <input
            className='border-none bg-gray-400 text-lg placeholder-black'
            placeholder={item.short_url}
            // onChange={(e) => {
            //   setEditData(e.target.value);
            // }}
          />
          <Button
            className='focus:outline-none w-24 '
            variant='contained'
            color='secondary'
            startIcon={<SaveIcon />}
            type='submit'
          >
            Save
          </Button>
        </form>
        <Button
          className='focus:outline-none w-24'
          variant='contained'
          color='primary'
        //   onClick={(e) => {
        //     setEditf(false);
        //   }}
        >
          Cancle
        </Button>
      </div>
    );
}

export default EditForm
