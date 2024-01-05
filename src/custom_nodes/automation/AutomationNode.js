import { useState, memo } from "react";
import { Position } from "reactflow";
import { MdEdit } from "react-icons/md";
import AutomationHandle from "./AutomationHandle";
import { useNodeHandlers } from "../useNodeHandlers";
import Form from "../Form";


// TurboNode component
export default memo(({ id, data, isConnectable }) => {
  const [isFormVisible, setFormVisible] = useState(false);

  const {
    formRef,
    handleEditClick,
    handleCloseForm,
    confirmDelete,
    automationHandleConnect,
  } = useNodeHandlers(id, isFormVisible, setFormVisible);

  return (
    <>
      <AutomationHandle
        type="target"
        position={Position.Left}
        id="automation-target"
        onConnect={(connection) => automationHandleConnect(connection, id)}
      />

      <button onClick={handleEditClick} className="edit-button">
        <div className="cloud gradient">
          <div>
            <MdEdit />
          </div>
        </div>
      </button>
      <Form
        isVisible={isFormVisible}
        onClose={handleCloseForm}
        confirmDelete={() => confirmDelete(id)}
        formRef={formRef} // Pass the ref to the form
        initialData={data} // Pass the initial data for the form
      />
      <div className="wrapper gradient">
        <div className="inner">
          <div className="body">
            {data.icon && <div className="icon">{data.icon}</div>}
            <div>
              <div className="title">{data.title}</div>
              {data.subline && <div className="subline">{data.subline}</div>}
            </div>
          </div>
        </div>
      </div>
      <AutomationHandle
        type="source"
        position={Position.Right}
        id="automation-start-source"
        style={{ top: 30, background: "#2a8af6" }}
        onConnect={(connection) => automationHandleConnect(connection, id)}
      />

      <AutomationHandle
        type="source"
        position={Position.Right}
        id="automation-stop-source"
        style={{ top: 50, background: "#e92a67" }}
        onConnect={(connection) => automationHandleConnect(connection, id)}
      />
    </>
  );
});
