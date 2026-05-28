"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft, Plus, Check, Calendar, Edit2, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from "@/utils/toast";

interface Task {
  id: number;
  titulo: string;
  data_criacao: string;
  status: string;
  data_conclusao: string | null;
}

const Tasks = () => {
  const goHome = () => {
    window.location.href = "/";
  };

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("tarefas")
      .select("*")
      .order("data_criacao", { ascending: false });

    if (error) {
      console.error("Error fetching tasks:", error);
      showError("Erro ao carregar tarefas");
    } else {
      setTasks(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingTask) {
      const { error } = await supabase
        .from("tarefas")
        .update({ titulo: title.trim() })
        .eq("id", editingTask.id);

      if (error) {
        console.error("Error updating task:", error);
        showError("Erro ao atualizar tarefa");
      } else {
        showSuccess("Tarefa atualizada com sucesso!");
        fetchTasks();
      }
    } else {
      const { error } = await supabase
        .from("tarefas")
        .insert({
          titulo: title.trim(),
          status: "pendente",
          data_conclusao: null,
        });

      if (error) {
        console.error("Error inserting task:", error);
        showError("Erro ao criar tarefa");
      } else {
        showSuccess("Tarefa criada com sucesso!");
        fetchTasks();
      }
    }

    setTitle("");
    setShowForm(false);
    setEditingTask(null);
  };

  const toggleStatus = async (task: Task) => {
    const newStatus = task.status === "concluida" ? "pendente" : "concluida";
    const { error } = await supabase
      .from("tarefas")
      .update({
        status: newStatus,
        data_conclusao: newStatus === "concluida" ? new Date().toISOString() : null,
      })
      .eq("id", task.id);

    if (error) {
      console.error("Error updating status:", error);
      showError("Erro ao atualizar status");
    } else {
      showSuccess(`Tarefa ${newStatus === "concluida" ? "concluída" : "reaberta"}!`);
      fetchTasks();
    }
  };

  const deleteTask = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir esta tarefa?")) return;

    const { error } = await supabase.from("tarefas").delete().eq("id", id);

    if (error) {
      console.error("Error deleting task:", error);
      showError("Erro ao excluir tarefa");
    } else {
      showSuccess("Tarefa excluída com sucesso!");
      fetchTasks();
    }
  };

  const editTask = (task: Task) => {
    setEditingTask(task);
    setTitle(task.titulo);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 pt-16">
      {/* Simple header without redundant bar */}
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={goHome} className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors">
            <ArrowLeft size={20} /> <span className="font-medium">Voltar</span>
          </button>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Minhas Tarefas
          </h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors"
          >
            <Plus size={18} /> <span className="hidden sm:inline">Nova Tarefa</span>
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-20">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {editingTask ? "Editar Tarefa" : "Nova Tarefa"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Digite o título da tarefa..."
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                autoFocus
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingTask(null);
                    setTitle("");
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition-colors"
                >
                  {editingTask ? "Salvar" : "Criar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tasks List */}
      <div className="p-4 max-w-2xl mx-auto">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="text-purple-600" size={24} />
            </div>
            <p className="text-gray-600">Nenhuma tarefa encontrada</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 text-purple-600 font-medium hover:underline"
            >
              Criar primeira tarefa
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-purple-200"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3
                      className={`font-medium text-gray-800 ${task.status === "concluida" ? "line-through text-indigo-700" : "text-gray-800"}`}
                    >
                      {task.titulo}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${task.status === "concluida" ? "bg-indigo-100 text-indigo-700" : "bg-purple-100 text-purple-700"}`}
                      >
                        {task.status === "concluida" ? "Concluída" : "Pendente"}
                      </span>
                      <span className="text-gray-400">
                        {new Date(task.data_criacao).toLocaleDateString("pt-BR",)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleStatus(task)}
                    className={`p-2 rounded-lg transition-colors ${task.status === "concluida" ? "text-indigo-600 hover:bg-indigo-50" : "text-gray-400 hover:bg-gray-100"}`}
                  >
                    <Check size={18} />
                  </button>
                  <button
                    onClick={() => editTask(task)}
                    className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;